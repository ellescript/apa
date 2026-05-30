import { Entity } from "@ellescript/collecty";
import { stripHtml } from "string-strip-html";

class APA extends Entity {

    toString() {
        const authors = this.object.authors ? this.object.authors.join(", ") : "";

        let citation = `${authors} (${this.object.year}). ${this.object.title}. ${this.object.journal}`;

        if (this.object.volume) {
            citation += `, ${this.object.volume}`;
        }

        if (this.object.issue) {
            citation += `(${this.object.issue})`;
        }

        if (this.object.number) {
            citation += `, ${this.object.number}`;
        }

        if (this.object.pages) {
            citation += `, ${this.object.pages}`;
        }

        if (this.object.doi) {
            citation += `. https://doi.org/${this.object.doi}`;
        }

        return `${citation}`;
    }

}

/**
 * Converts string to object APA
 * 
 * @example
 * ```js
 * apa("Martínez-Miranda, J., Aguilar-Cázares, D., Flores-Flores, A., Santos-Contreras, M. Á., López-González, J. S., Aguayo-Ortiz, R., Hernández-Pando, R., & Hernández-Luis, F.* (2026). Glyoxalase-1 inhibition leads to ferroptosis induction in lung cancer cells: A dual mechanism of action of hydroxamic acids derived from cysteine. ChemMedChem, 21(1), e202500804. DOI:10.1002/cmdc.202500804")
 * ```
 * 
 * @param {string|object} citation
 * @returns {object}
 */
export const apa = (citation) => {

    if(citation instanceof Object) {
        return new APA(citation);
    }

    citation = stripHtml(citation).result;

    citation = citation
        .replace(/[’‘]/g, "'")
        .replace(/[“”]/g, '"')
        .replace(/^"(.*)"$/, '$1');

    const result = {};

    // 1. Separar DOI
    const [mainPart, doiPart] = citation.split("DOI:");
    result.doi = doiPart ? doiPart.trim() : null;

    // 2. Autores + resto
    const firstParen = mainPart.indexOf("(");
    const authorsPart = mainPart.slice(0, firstParen).trim();
    const rest = mainPart.slice(firstParen);

    result.authors = parseAuthors(authorsPart);

    // 3. Año
    const yearMatch = rest.match(/\((\d{4})\)/);
    result.year = yearMatch ? parseInt(yearMatch[1]) : null;

    // 4. Quitar "(2026)."
    const afterYear = rest.replace(/^\(\d{4}\)\.\s*/, "");

    // 5. Title (hasta antes del journal)
    const titleMatch = afterYear.match(/^(.*?)\.\s*[A-Z]/);
    result.title = titleMatch ? titleMatch[1].trim() : null;

    // 6. Journal (después del título)
    result.journal = extractJournal(afterYear);

    // 7. Volume / Issue / Number (si existen)
    const journalMetaMatch = afterYear.match(/,\s*(\d+)\((\d+)\),\s*([^\s.]+)/);

    if (journalMetaMatch) {
        result.volume = journalMetaMatch[1];
        result.issue = journalMetaMatch[2];
        result.number = journalMetaMatch[3];
    }

    return new APA(result);
};

function parseAuthors(authorsStr) {
    return authorsStr
        .replace(/&/g, "")        // quita &
        .replace(/\*/g, "")       // quita *
        .split(",")
        .map(s => s.trim())
        .filter(Boolean)
        .reduce((acc, curr, index, arr) => {
            if (index % 2 === 0) {
                const next = arr[index + 1];
                if (next) {
                    acc.push(`${curr}, ${next.trim()}`);
                }
            }
            return acc;
        }, []);
}

function extractJournal(text) {
    // elimina DOI si aún está
    const clean = text.split("DOI:")[0].trim();

    // elimina title (todo antes del journal)
    const afterTitle = clean.replace(/^(.*?)\.\s*/, "");

    // journal termina antes de ", volumen(" o antes de "."
    const match = afterTitle.match(/^([^,\.]+)(?=,\s*\d+\(|\.)/);

    return match ? match[1].trim() : null;
}