import { apa } from '../index.js';

describe('apa()', () => {

    test('parses APA citation correctly', () => {

        const citation = 'Martínez-Miranda, J., Aguilar-Cázares, D., Flores-Flores, A., Santos-Contreras, M. Á., López-González, J. S., Aguayo-Ortiz, R., Hernández-Pando, R., & Hernández-Luis, F.* (2026). Glyoxalase-1 inhibition leads to ferroptosis induction in lung cancer cells: A dual mechanism of action of hydroxamic acids derived from cysteine. ChemMedChem, 21(1), e202500804. DOI:10.1002/cmdc.202500804';

        const result = apa(citation);

        expect(result.object).toEqual({
            authors: [
                'Martínez-Miranda, J.',
                'Aguilar-Cázares, D.',
                'Flores-Flores, A.',
                'Santos-Contreras, M. Á.',
                'López-González, J. S.',
                'Aguayo-Ortiz, R.',
                'Hernández-Pando, R.',
                'Hernández-Luis, F.'
            ],
            year: 2026,
            title: 'Glyoxalase-1 inhibition leads to ferroptosis induction in lung cancer cells: A dual mechanism of action of hydroxamic acids derived from cysteine',
            journal: 'ChemMedChem',
            volume: '21',
            issue: '1',
            number: 'e202500804',
            doi: '10.1002/cmdc.202500804'
        });

    });

    test('converts APA object back to string', () => {

        const citation = 'Martínez-Miranda, J., Aguilar-Cázares, D., Flores-Flores, A., Santos-Contreras, M. Á., López-González, J. S., Aguayo-Ortiz, R., Hernández-Pando, R., & Hernández-Luis, F.* (2026). Glyoxalase-1 inhibition leads to ferroptosis induction in lung cancer cells: A dual mechanism of action of hydroxamic acids derived from cysteine. <em>ChemMedChem, 21</em>(1), e202500804. DOI:<a href="https://doi.org/10.1002/cmdc.202500804" target="_blank" rel="noopener">10.1002/cmdc.202500804</a>';

        const result = apa(citation);

        expect(result.toString()).toBe(
            'Martínez-Miranda, J., Aguilar-Cázares, D., Flores-Flores, A., Santos-Contreras, M. Á., López-González, J. S., Aguayo-Ortiz, R., Hernández-Pando, R., Hernández-Luis, F. (2026). Glyoxalase-1 inhibition leads to ferroptosis induction in lung cancer cells: A dual mechanism of action of hydroxamic acids derived from cysteine. ChemMedChem, 21(1), e202500804. https://doi.org/10.1002/cmdc.202500804'
        );

    });

    test('supports smart quotes normalization', () => {

        const citation = '“Camacho-López, M. D., Figueroa, M., Hernández-Melgar, A., Riquelme, M. (2026). Salinity stress response of black yeasts isolated from deep-sea sediments of the Gulf of Mexico. Communications Biology. DOI:10.1038/s42003-026-09673-0”';

        const result = apa(citation);

        expect(result.object.authors).toEqual([
            'Camacho-López, M. D.',
            'Figueroa, M.',
            'Hernández-Melgar, A.',
            'Riquelme, M.'
        ]);

        expect(result.object.year).toBe(2026);

        expect(result.object.journal).toBe('Communications Biology');

        expect(result.object.doi).toBe(
            '10.1038/s42003-026-09673-0'
        );

    });

    test('supports creation APA citation from object', () => {

        const citation = {
            authors: [
                'Martínez-Miranda, J.',
                'Aguilar-Cázares, D.',
                'Flores-Flores, A.',
                'Santos-Contreras, M. Á.',
                'López-González, J. S.',
                'Aguayo-Ortiz, R.',
                'Hernández-Pando, R.',
                'Hernández-Luis, F.'
            ],
            year: 2026,
            title: 'Glyoxalase-1 inhibition leads to ferroptosis induction in lung cancer cells: A dual mechanism of action of hydroxamic acids derived from cysteine',
            journal: 'ChemMedChem',
            volume: '21',
            issue: '1',
            number: 'e202500804',
            doi: '10.1002/cmdc.202500804'
        };

        const result = apa(citation);

        expect(result.toString()).toEqual("Martínez-Miranda, J., Aguilar-Cázares, D., Flores-Flores, A., Santos-Contreras, M. Á., López-González, J. S., Aguayo-Ortiz, R., Hernández-Pando, R., Hernández-Luis, F. (2026). Glyoxalase-1 inhibition leads to ferroptosis induction in lung cancer cells: A dual mechanism of action of hydroxamic acids derived from cysteine. ChemMedChem, 21(1), e202500804. https://doi.org/10.1002/cmdc.202500804");

    })
    test('another supports creation APA citation from object', () => {

        const citation = {
            "id_siia": 702520,
            "title": "Naturally-derived cellulose-chitosan soft-hydrogel for sustained local docetaxel micelles delivery: from in silico modeling to preclinical validation in ovarian and glioblastoma models",
            "journal": "Carbohydrate Polymer Technologies And Applications",
            "scope": "Article",
            "doi": "10.1016/j.carpta.2026.101120",
            "sources": [
                {
                    "id": 1024608,
                    "id_article": 702520,
                    "name": "SCOPUS(SJR)",
                    "RefPublicacion": 702520
                },
                {
                    "id": 1024609,
                    "id_article": 702520,
                    "name": "WOS(JCR)-Core Collection",
                    "RefPublicacion": 702520
                },
                {
                    "id": 1024610,
                    "id_article": 702520,
                    "name": "SciELO",
                    "RefPublicacion": 702520
                }
            ],
            "article__person": {
                "id": 2505079,
                "id_person": 124216,
                "id_journal": 702520,
                "refPersona": 124216,
                "refPublicacion": 702520
            },
            "status": "Aprobado",
            "source": "SIIA",
            "year": "2026"
        };

        const result = apa(citation);

        expect(result.toString()).toEqual(" (2026). Naturally-derived cellulose-chitosan soft-hydrogel for sustained local docetaxel micelles delivery: from in silico modeling to preclinical validation in ovarian and glioblastoma models. Carbohydrate Polymer Technologies And Applications. https://doi.org/10.1016/j.carpta.2026.101120");

    })

    test('journal is retrieved correctly', () => {

        const citation = "Alvarez-Amparán, M. A.*, Chacon-Argaez, U., & Cedeño-Caero, L.* (2026). The effect of electronic and optical properties on the kinetic photocatalytic model of methyl blue degradation. Molecules (Basel, Switzerland), 31(5), 782. DOI:10.3390/molecules31050782"

        const result = apa(citation);

        expect(result.object.journal).toBe('Molecules (Basel, Switzerland)');
        expect(result.object.doi).toBe('10.3390/molecules31050782');
        expect(result.object.volume).toBe('31');
        expect(result.object.issue).toBe('5');
        expect(result.object.number).toBe('782');
    })
    
    test('aburto', () => {

        const citation = "Diaz-Herrera, P., Amezcua-Allieri, M. A., Vega, E., Hernández-Martínez, E., & Aburto, J. (2026). Decarbonization of sugarcane refinery through bioethanol production and CHP generation with carbon capture and storage (BECCS). DOI: 10.2139/ssrn.6251010"

        const result = apa(citation);

        expect(result.toString()).toBe('Diaz-Herrera, P., Amezcua-Allieri, M. A., Vega, E., Hernández-Martínez, E., Aburto, J. (2026). Decarbonization of sugarcane refinery through bioethanol production and CHP generation with carbon capture and storage (BECCS). https://doi.org/10.2139/ssrn.6251010');
    })
});