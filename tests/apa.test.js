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

        const citation = 'Martínez-Miranda, J., Aguilar-Cázares, D., Flores-Flores, A., Santos-Contreras, M. Á., López-González, J. S., Aguayo-Ortiz, R., Hernández-Pando, R., & Hernández-Luis, F.* (2026). Glyoxalase-1 inhibition leads to ferroptosis induction in lung cancer cells: A dual mechanism of action of hydroxamic acids derived from cysteine. ChemMedChem, 21(1), e202500804. DOI:10.1002/cmdc.202500804';

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

});