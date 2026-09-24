// Outset publication format 0.0.1. See lib/README.md for provenance.
import { publicationYaml } from "./rulesPublication.mjs";
/** A small author-owned outline, independent of entry types and application code. */
export function parseRulesPublicationBook(source) {
    if (new TextEncoder().encode(source).byteLength > 256 * 1024)
        throw new Error("Book outline exceeds 256 KiB.");
    const match = /^---\r?\n([\s\S]*?)\r?\n---\s*$/.exec(source);
    if (!match)
        throw new Error("Book outline requires only YAML frontmatter.");
    const header = publicationYaml(match[1]);
    if (header.format !== "dm-harness-publication-book" || header.version !== "0.0.1"
        || Object.keys(header).some((key) => !["format", "version", "id", "title", "chapters"].includes(key)))
        throw new Error("Invalid book outline format.");
    const label = (value) => {
        if (typeof value !== "string" || !value.trim())
            throw new Error("Missing book outline label or identifier.");
        return value;
    };
    if (!Array.isArray(header.chapters) || !header.chapters.length)
        throw new Error("Book outline requires chapters.");
    const book = {
        id: label(header.id), title: label(header.title),
        chapters: header.chapters.map((value) => {
            if (!value || typeof value !== "object" || Array.isArray(value))
                throw new Error("Invalid book chapter.");
            const chapter = value;
            if (Object.keys(chapter).some((key) => !["id", "title", "documents"].includes(key)) || !Array.isArray(chapter.documents))
                throw new Error("Invalid book chapter fields.");
            return { id: label(chapter.id), title: label(chapter.title), documents: chapter.documents.map(label) };
        })
    };
    if (new Set(book.chapters.map((chapter) => chapter.id)).size !== book.chapters.length)
        throw new Error("Duplicate book chapter ID.");
    return book;
}
export function validatePublicationBooks(books, publications) {
    const ids = new Set();
    const documents = new Set();
    for (const book of books) {
        if (ids.has(book.id))
            throw new Error("Duplicate book ID.");
        ids.add(book.id);
        for (const id of book.chapters.flatMap((chapter) => chapter.documents)) {
            if (documents.has(id))
                throw new Error(`Repeated book document: ${id}`);
            if (!publications.some((publication) => publication.id === id))
                throw new Error(`Missing book document: ${id}`);
            documents.add(id);
        }
    }
}
