// Outset publication format 0.0.1. See lib/README.md for provenance.
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { isAlias, isNode, parseDocument, visit } from "yaml";
export const publicationEntryKey = (entry) => `${entry.packId}:${entry.type}:${entry.id}`;
export function publicationEntry(packs, reference) {
    return packs.find((pack) => pack.id === reference.packId)?.entries.find((entry) => entry.id === reference.id && entry.type === reference.type);
}
export function publicationSpellLevel(entry) {
    return entry.type === "spell" ? (entry.structured?.kind === "spell" ? entry.structured.level
        : typeof entry.data.level === "number" ? entry.data.level : undefined) : undefined;
}
export function publicationReference(value) {
    const match = /^([a-zA-Z0-9_-]+):([a-zA-Z0-9_-]+):([a-zA-Z0-9_-]+)$/.exec(value);
    if (!match)
        throw new Error(`Invalid compendium reference: ${value}`);
    return { packId: match[1], type: match[2], id: match[3] };
}
export function publicationNodeText(node) {
    return node.value ?? node.children?.map(publicationNodeText).join(["table", "tableRow", "list", "listItem", "blockquote"].includes(node.type) ? " " : "") ?? "";
}
function object(value) {
    if (!value || typeof value !== "object" || Array.isArray(value))
        throw new Error("Expected a YAML object.");
    return value;
}
function fields(value, allowed) {
    const allowedFields = new Set(allowed);
    if (Object.keys(value).some((key) => !allowedFields.has(key)))
        throw new Error("Unknown publication field.");
}
function string(value, label) {
    if (typeof value !== "string" || !value.trim())
        throw new Error(`Missing ${label}.`);
    return value;
}
export function publicationYaml(source) {
    const document = parseDocument(source, { strict: true, uniqueKeys: true, merge: false });
    if (document.errors.length || document.warnings.length)
        throw new Error((document.errors[0] ?? document.warnings[0]).message);
    visit(document, (_key, node) => {
        if (isAlias(node) || (isNode(node) && (node.tag || node.anchor)))
            throw new Error("YAML aliases, anchors, and tags are unsupported.");
    });
    return object(document.toJS({ maxAliasCount: 0 }));
}
const processor = unified().use(remarkParse).use(remarkGfm);
const allowedNodes = new Set(["heading", "paragraph", "text", "emphasis", "strong", "delete", "inlineCode", "break", "link", "list", "listItem", "blockquote", "thematicBreak", "table", "tableRow", "tableCell"]);
function validateNode(node, depth = 0) {
    if (depth > 30 || !allowedNodes.has(node.type))
        throw new Error(`Unsupported publication content: ${node.type}.`);
    if (node.type === "table" && node.children?.some((row) => row.children?.length !== node.children[0]?.children?.length)) {
        throw new Error("Table rows must have the same number of cells as their header.");
    }
    if (node.type === "link") {
        if (node.url?.startsWith("compendium:"))
            publicationReference(node.url.slice(11));
        else if (!node.url || !/^https:\/\//.test(node.url))
            throw new Error("Links must use HTTPS or a compendium reference.");
    }
    node.children?.forEach((child) => validateNode(child, depth + 1));
}
/** Author-time Markdown is compiled into a passive view model. No rules, scripts, or network operations run here. */
export function parseRulesPublication(markdown) {
    if (new TextEncoder().encode(markdown).byteLength > 512 * 1024)
        throw new Error("Publication exceeds 512 KiB.");
    const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(markdown);
    if (!match)
        throw new Error("Publication requires YAML frontmatter.");
    const header = publicationYaml(match[1]);
    fields(header, ["format", "version", "id", "title", "entry", "sourceHash", "source", "attribution", "groups", "sourcePacks"]);
    if (header.format !== "dm-harness-publication" || header.version !== "0.0.1")
        throw new Error("Unsupported publication format or version.");
    const binding = header.entry === undefined && header.sourceHash === undefined
        ? { kind: "reference" }
        : { kind: "entry", entry: publicationReference(string(header.entry, "entry")), sourceHash: string(header.sourceHash, "sourceHash") };
    const groups = header.groups === undefined ? {} : object(header.groups);
    const sourcePacks = Object.fromEntries(Object.entries(header.sourcePacks === undefined ? {} : object(header.sourcePacks)).map(([id, hash]) => {
        if (!/^[a-zA-Z0-9_-]+$/.test(id))
            throw new Error("Invalid source pack ID.");
        return [id, string(hash, "source pack hash")];
    }));
    if (binding.kind === "reference" && !Object.keys(sourcePacks).length)
        throw new Error("Reference documents require an installed source pack binding.");
    const publication = {
        ...binding, id: string(header.id, "id"), title: string(header.title, "title"), source: string(header.source, "source"),
        attribution: string(header.attribution, "attribution"), sourcePacks, sections: []
    };
    const root = processor.parse(markdown.slice(match[0].length));
    const ids = new Set();
    let section;
    for (const node of root.children) {
        if (node.type === "heading" && node.depth === 2) {
            const heading = /^(.*?)\s+\{#([a-zA-Z][a-zA-Z0-9_-]*)\}$/.exec(publicationNodeText(node));
            if (!heading || !heading[1].trim() || ids.has(heading[2]))
                throw new Error("Each H2 needs a unique explicit {#section-id}.");
            const id = heading[2];
            ids.add(id);
            section = { id, title: heading[1].trim(), group: groups[id] === undefined ? publication.title : string(groups[id], "section group"), blocks: [], links: [] };
            publication.sections.push(section);
        }
        else if (!section)
            throw new Error("Publication body must start with an H2 section.");
        else if (node.type === "code" && node.lang === "compendium-links") {
            if (section.links.length)
                throw new Error("Only one compendium-links block is allowed per section.");
            const links = publicationYaml(node.value);
            fields(links, ["entries", "groupBy"]);
            if (!Array.isArray(links.entries) || !links.entries.length || links.entries.length > 2000)
                throw new Error("Expected 1–2000 entry references.");
            section.links = links.entries.map((value) => publicationReference(string(value, "reference")));
            if (new Set(section.links.map(publicationEntryKey)).size !== section.links.length)
                throw new Error("Duplicate entry reference.");
            if (links.groupBy !== undefined && links.groupBy !== "spell-level")
                throw new Error("Unsupported reference grouping.");
            if (links.groupBy)
                section.groupLinksBy = "spell-level";
        }
        else {
            if (section.links.length)
                throw new Error("Compendium links must be the last block in a section.");
            if (node.type === "heading" && node.depth < 3)
                throw new Error("Use frontmatter for the title and H2 for sections.");
            validateNode(node);
            section.blocks.push(node);
        }
    }
    if (!publication.sections.length || Object.keys(groups).some((id) => !ids.has(id)))
        throw new Error("Missing section or group points to an unknown section.");
    return publication;
}
export function publicationReferences(section) {
    const references = [...section.links];
    const walk = (node) => {
        if (node.type === "link" && node.url?.startsWith("compendium:"))
            references.push(publicationReference(node.url.slice(11)));
        node.children?.forEach(walk);
    };
    section.blocks.forEach(walk);
    return references;
}
/** A saved edition is eligible only for its exact installed source. Missing related entries remain unavailable. */
export function publicationMatchesSource(publication, packs) {
    return (publication.kind === "reference" || publicationEntry(packs, publication.entry)?.contentHash === publication.sourceHash)
        && Object.entries(publication.sourcePacks).every(([id, hash]) => packs.find((pack) => pack.id === id)?.contentHash === hash);
}
