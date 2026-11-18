// Kategorije istim redom i pod istim imenima kao u meniju sadašnjeg sajta.
// m = modeli (podkategorije sa sadašnjeg sajta). md/t/d = model, tkanina, dostupnost (primer za filter).
// Proizvodi su primeri sa sajta (naziv, cena, slika); raspored po kategorijama je primer za mockup.
window.KAT = [
  { k: 'poslednji-komadi', n: 'Poslednji komadi', o: 'Poslednji komadi u svom dezenu. Kad nestanu, ne ponavljaju se.' , m: [] },
  { k: 'swara-man', n: 'Swara man', o: 'Muška kolekcija iz istog ateljea.' , m: ["Pantalone", "Jakna Kinyonga", "Kimono", "Duks jakne", "Košulje", "Duks sa kapuljačom", "Dodaci", "Jakne", "Cargo pantalone unisex"] },
  { k: 'bluze-tunike-kardigani', n: 'Bluze, tunike i kardigani', o: 'Boho krojevi od prirodnih materijala, i za punije figure.' , m: ["Sankofa", "Tea", "Eclipse", "Lanene i pamučne bluzice", "Kaftani", "Bluze od kašira", "Dune", "Tsavo", "Tunike od lan gaze", "Mavuno", "Košulje", "Toskana"] },
  { k: 'haljine-pamucne', n: 'Haljine pamučne', o: 'Afrički pamuk sa autentičnim printovima, po meri ili prema tabeli veličina.' , m: ["Haljine na preklop", "Lea", "Gulshan", "Kami", "Grejs", "Fidži", "Zaidi", "Salome", "Emily", "Kubwa", "Rolka", "Luyando"] },
  { k: 'haljine-lanene', n: 'Haljine lanene', o: 'Čist lan za leto: lagan, prozračan i udoban.' , m: ["Sulla", "Botanica", "Kaftani", "Mala lanena haljina", "Durmita", "Safari", "Nomad", "Amara", "Sahara Muse", "Košulja haljina", "Kimono haljina", "Mirelle", "Malaika"] },
  { k: 'haljine-svilene', n: 'Haljine svilene', o: 'Svilene mešavine za posebne prilike i putovanja.' , m: ["Celestine", "Noa", "Magna", "Duge svilene haljine", "Svilena haljina na preklop"] },
  { k: 'kombinezoni', n: 'Kombinezoni', o: 'Od lana ili afričkog pamuka, u velikom izboru modela i dezena.' , m: ["Blaze", "Helena", "Monako", "Fluid"] },
  { k: 'nakit', n: 'Nakit', o: 'Ručni rad iz okolnih plemena i ženskih udruženja.' , m: ["Narukvice", "Nomadski nakit", "Nanogice", "Minđuše", "Prstenje", "Masai ogrlice od perlica", "Privesci od srebra"] },
  { k: 'pantalone-lanene', n: 'Pantalone lanene', o: 'Svedene lanene pantalone za leto.' , m: ["Kink Street", "Linea", "Palazzo", "Cargo od lana"] },
  { k: 'pantalone-pamucne', n: 'Pantalone pamučne', o: 'Pamučne pantalone sa afričkim printom.' , m: ["City", "Palazzo", "Marion", "Wrap Theory"] },
  { k: 'pantalone-svilene', n: 'Pantalone svilene', o: 'Lepršave svilene pantalone.' , m: ["City", "Palazzo"] },
  { k: 'poklon-ideje', n: 'Poklon ideje', o: 'Pokloni koji dolaze sa ekvatora.' , m: ["Podmetači", "Ukrasne korpe", "Poklon kartice", "Slike", "Prirodna kozmetika", "Kikoyi", "Neseseri", "Kaiševi", "Ešarpe", "Maske, statue i drveni predmeti", "Ukrasni jastučići"] },
  { k: 'sakoi-mantili', n: 'Sakoi i mantili', o: 'Šiveni u Keniji, od 100% pamučnih tkanina.' , m: ["Sako Rahizi Easy", "Sako Lela", "Mantili dugi i kratki", "Duks jakne za žene", "Pelerina sako"] },
  { k: 'suknje', n: 'Suknje', o: 'Kratke i duge suknje od pamuka i lana.' , m: ["Peni", "Suknje na preklop", "Kargo", "Karibi", "Balon suknja", "Jessica", "Kratke suknje"] },
  { k: 'tkanine', n: 'Tkanine', o: 'Izaberite tkaninu za svoj model.' , m: ["Batik", "Svila", "Viskoze", "Tkanine u Srbiji", "Lan", "Češljani pamuk"] },
  { k: 'torbe-cegeri', n: 'Torbe i cegeri', o: 'Ručno pleteni cegeri i torbe.' , m: ["Cegeri Swara", "Neseseri", "Tašne od prirodnog vlakna"] },
  { k: 'obuca', n: 'Obuća', o: 'Japanke i sandale sa perlicama, ručni rad.' }
];

window.PROIZVODI = [
  { n: 'Mantil dugi, tribal', c: '7.200', s: 'mantil-tribal', k: ['poslednji-komadi', 'sakoi-mantili'], z: 'Poslednji u dezenu' , md: 'Mantili dugi i kratki', t: 'Pamuk', d: 'stanje' },
  { n: 'Bomber jakna bomber batik', c: '8.000', s: 'bomber-batik', k: ['swara-man'] , md: 'Jakne', t: 'Batik', d: 'stanje' },
  { n: 'Magna svilena tunika haljina, zelena', c: '6.500', s: 'tunika-magna-svilena', k: ['haljine-svilene', 'bluze-tunike-kardigani'] , md: 'Magna', t: 'Svila', d: 'stanje' },
  { n: 'Pamučna bluza bez rukava, bela', c: '2.500', s: 'bluza-bez-rukava', k: ['bluze-tunike-kardigani'] , md: 'Lanene i pamučne bluzice', t: 'Pamuk', d: 'stanje' },
  { n: 'Lanena košulja haljina tribal blue', c: '5.500', s: 'lanena-kosulja-haljina', k: ['haljine-lanene'] , md: 'Košulja haljina', t: 'Lan', d: 'stanje' },
  { n: 'Haljina Claudia earthy', c: '6.900', s: 'haljina-claudia', k: ['haljine-pamucne'] , md: 'Haljine na preklop', t: 'Pamuk', d: 'stanje' },
  { n: 'Haljina Lea mystique', c: '6.500', s: 'haljina-lea-mystique', k: ['haljine-pamucne'] , md: 'Lea', t: 'Pamuk', d: 'stanje' },
  { n: 'Grejs haljina tirkizno teget', c: '6.000', s: 'haljina-grejs', k: ['haljine-pamucne'] , md: 'Grejs', t: 'Pamuk', d: 'stanje' },
  { n: 'Tirkiz Kubwa haljina', c: '6.000', s: 'haljina-tirkiz-kubwa', k: ['haljine-pamucne'] , md: 'Kubwa', t: 'Pamuk', d: 'porudzbina' },
  { n: 'Haljina Kubwa Pumpkin', c: '5.500', s: 'haljina-kubwa-pumpkin', k: ['haljine-pamucne'] , md: 'Kubwa', t: 'Pamuk', d: 'stanje' },
  { n: 'Haljina Kami brown orange', c: '4.900', s: 'haljina-kami', k: ['haljine-pamucne'] , md: 'Kami', t: 'Pamuk', d: 'stanje' },
  { n: 'Sunset, Umami haljina', c: '4.500', s: 'haljina-sunset-umami', k: ['haljine-pamucne'] , md: 'Rolka', t: 'Pamuk', d: 'porudzbina' },
  { n: 'Emily haljina plavi palmin list', c: '4.400', s: 'haljina-emily', k: ['haljine-pamucne'] , md: 'Emily', t: 'Pamuk', d: 'stanje' },
  { n: 'Salome haljina Mozaik', c: '4.400', s: 'haljina-salome-mozaik', k: ['haljine-pamucne'] , md: 'Salome', t: 'Pamuk', d: 'stanje' },
  { n: 'Emily haljina big beng', c: '4.400', s: 'haljina-big-beng', k: ['haljine-pamucne'] , md: 'Emily', t: 'Pamuk', d: 'porudzbina' },
  { n: 'Kombinezon Blaze nude', c: '5.000', s: 'kombinezon-savana', k: ['kombinezoni'] , md: 'Blaze', t: 'Lan', d: 'stanje' },
  { n: 'Igra staklenih perli, ogrlica', c: '5.500', s: 'ogrlica-staklene-perle', k: ['nakit'] , md: 'Masai ogrlice od perlica', t: '', d: 'stanje' },
  { n: 'Ogrlica Petra', c: '4.000', s: 'ogrlica-petra', k: ['nakit'] , md: 'Nomadski nakit', t: '', d: 'stanje' },
  { n: 'Krokodil, mesing narukvica', c: '3.500', s: 'narukvica-krokodil', k: ['nakit'] , md: 'Narukvice', t: '', d: 'stanje' },
  { n: 'Palazzo lanene pantalone indigo', c: '6.500', s: 'palazzo-indigo', k: ['pantalone-lanene'] , md: 'Palazzo', t: 'Lan', d: 'stanje' },
  { n: 'Kikoy bela kafa', c: '2.500', s: 'kikoy-bela-kafa', k: ['poklon-ideje'] , md: 'Kikoyi', t: 'Pamuk', d: 'stanje' },
  { n: 'Prirodna kozmetika', c: '300', s: 'kozmetika-awali', k: ['poklon-ideje'] , md: 'Prirodna kozmetika', t: '', d: 'stanje' },
  { n: 'Mantil Primavera', c: '5.900', s: 'mantil-primavera', k: ['sakoi-mantili'] , md: 'Mantili dugi i kratki', t: 'Pamuk', d: 'porudzbina' },
  { n: 'Kratka suknja Primavera', c: '3.500', s: 'suknja-primavera', k: ['suknje'] , md: 'Kratke suknje', t: 'Pamuk', d: 'stanje' },
  { n: 'Tkanina na stanju buffalo', c: '4.000', s: 'tkanina-buffalo', k: ['tkanine'] , md: 'Tkanine u Srbiji', t: 'Pamuk', d: 'stanje' },
  { n: 'Ceger tribal', c: '4.500', s: 'ceger-tribal', k: ['torbe-cegeri'] , md: 'Cegeri Swara', t: '', d: 'stanje' },
  { n: 'Sandale sa perlicama', c: '3.900', s: 'sandale-perlice', k: ['obuca'] }
];

// Filteri sa sadašnjeg sajta (/shop), istim redom, nazivima i vrednostima kao u Odoo-u (18.11.2026).
window.ATR = [
  { g: 'Boja', v: ['bele', 'zelene', 'crvene', 'plava', 'roze', 'koralna', 'tirkizna', 'crna', 'crvena', 'teget', 'maslinasta', 'bela', 'azurna', 'narandzasta', 'krem', 'siva'] },
  { g: 'Size', v: ['xs/s', 's/m', 'l/xl', '2xl', 'free size', 'm/l', 'S', 'M', 'L', 'XL', '2XL', 'XS', '2xl/3xl', 'xl/2xl', 'petite', 'standard', 'tall girl', '3XL', 'xs/x'] },
  { g: 'Veličina obuce', v: ['36', '37', '38', '39', '40', '41', '42', '43', '44'] },
  { g: 'Veličina', v: ['XS', 'XS/S', 'S', 'S/M', 'M', 'M/L', 'L', 'L/XL', 'XL', 'XL/2XL', '2XL', '2XL/3XL', '3XL', 'rucna', 'putna', 'Free Size', '4XL'] },
  { g: 'Duzina', v: ['40 cm', '50 cm', '55 cm', '60 cm', '65 cm', '70 cm', '85 cm', '90cm', '95 cm', '100 cm', '105 cm', '110 cm', '115 cm', '120 cm', '125 cm', '130 cm', '135 cm', '140 cm', '145 cm', '150 cm', '155 cm', '160 cm', 'Petite', 'Standard', 'Tall girl'] },
  { g: 'Duzina kombinezona', v: ['Petite', 'Standard', 'Tall Girl'] },
  { g: 'Duzina haljine', v: ['100 cm', '110 cm', '120 cm', '130 cm', '145 cm', '150 cm', '95 cm', '135 cm', '140 cm', '125 cm', '105 cm', '85 cm', '90 cm', '115 cm', '160', '160 cm'] },
  { g: 'Duzina pantalona', v: ['55 cm', '60 cm', '90 cm', '100 cm', '105 cm', '110 cm', '65 cm', '95 cm', '70 cm'] },
  { g: 'Duzina suknje', v: ['60 cm', '65 cm', '90 cm', '100 cm', '105 cm', '110 cm', '70 cm', '95 cm', '125 cm', '150 cm', '145 cm', '120 cm', '115 cm', '85 cm', '75 cm', '50 cm'] },
  { g: 'Duzina jakne', v: ['65 cm', '70 cm', '85 cm', '100 cm'] },
  { g: 'Duzina kosulje', v: ['65 cm', '70 cm', '95 cm', '105 cm', '100 cm', '120 cm', '130 cm', '75 cm', '55', '80 cm'] },
  { g: 'Duzina mantila', v: ['105 cm', '110 cm', '115 cm', '120 cm', '125 cm', '135 cm', '130 cm', '100 cm'] },
  { g: 'Duzina rukava', v: ['Bez rukava', 'Kratak rukav 20 cm', '3/4 rukav'] },
  { g: 'Negliže', v: ['Bez negližea', 'Dodaj negliže'] },
  { g: 'Tip torbe', v: ['Rucna', 'Putna'] },
  { g: 'Gramaza', v: ['100 g', '250 g'] },
  { g: 'Dužina', v: ['55 cm', '60 cm', '65 cm', '70 cm', '85 cm', '90 cm', '95 cm', '100 cm', '105 cm', '110 cm', '115 cm', '120 cm', '125 cm', '130 cm', '135 cm', '140 cm', '145 cm', '150 cm', '160 cm', '115', '40 cm', '50 cm', '105', 'petite', 'standard', 'tall girl', 'midi (90 cm)', 'long (100 cm)', 'superlong (105 cm)', '155', '155 cm', 'ok', '130'] },
  { g: 'Rukav', v: ['dug rukav (62 cm)', 'pilot rukav (3/4)', 'bez rukava', 'krakat rukav (20 cm)', 'kratak rukav (20 cm)', 'bez a', 'sleeveless', '3/4 rukav', '65 cm', '70 cm', 'dress level', '40 inch sleeve', 'short sleeve', 'long sleeve'] },
  { g: 'Oznake', v: ['palazzo', 'Swara Man', 'Shorts', 'rolka', 'kaftan', 'silk', 'svila', 'cargo', 'fluid', 'kombinezon', 'kombinezoni', 'romper', 'st. tropez', 'suknje', 'jessica', 'lamu', 'balon', 'suknja', 'na preklop', 'city', 'pantalone', 'dezeni', 'batik', 'nakit', 'kubwa', 'heshima', 'lela', 'fiji'] }
];

// Primer vrednosti atributa za proizvode u pregledu (da filter nešto pokaže).
(function () {
  var A = {
    'mantil-tribal': { 'Veličina': ['M/L', 'L/XL'], 'Duzina mantila': ['120 cm'] },
    'bomber-batik': { 'Veličina': ['M', 'L', 'XL'], 'Oznake': ['Swara Man', 'batik'], 'Duzina jakne': ['65 cm'] },
    'tunika-magna-svilena': { 'Boja': ['zelene'], 'Veličina': ['M/L', 'L/XL'], 'Oznake': ['svila', 'silk'], 'Duzina haljine': ['90 cm'] },
    'bluza-bez-rukava': { 'Boja': ['bela'], 'Veličina': ['S', 'M', 'L'], 'Duzina rukava': ['Bez rukava'] },
    'lanena-kosulja-haljina': { 'Boja': ['azurna'], 'Veličina': ['S/M', 'M/L', 'L/XL'], 'Duzina haljine': ['100 cm'] },
    'haljina-claudia': { 'Boja': ['krem'], 'Veličina': ['M', 'L', 'XL'], 'Oznake': ['na preklop'], 'Duzina haljine': ['130 cm'] },
    'haljina-lea-mystique': { 'Boja': ['crna'], 'Veličina': ['M/L', 'L/XL'], 'Duzina haljine': ['140 cm'] },
    'haljina-grejs': { 'Boja': ['teget'], 'Veličina': ['S', 'M', 'L', 'XL'], 'Duzina haljine': ['150 cm'] },
    'haljina-tirkiz-kubwa': { 'Boja': ['tirkizna'], 'Veličina': ['M', 'L', 'XL', '2XL'], 'Oznake': ['kubwa'], 'Duzina haljine': ['120 cm'] },
    'haljina-kubwa-pumpkin': { 'Boja': ['narandzasta'], 'Veličina': ['M', 'L', 'XL'], 'Oznake': ['kubwa'], 'Duzina haljine': ['130 cm'] },
    'haljina-kami': { 'Boja': ['narandzasta'], 'Veličina': ['S', 'M', 'L'], 'Duzina haljine': ['110 cm'] },
    'haljina-sunset-umami': { 'Boja': ['krem'], 'Veličina': ['M', 'L'], 'Duzina haljine': ['110 cm'] },
    'haljina-emily': { 'Boja': ['plava'], 'Veličina': ['S', 'M', 'L', 'XL'], 'Duzina haljine': ['120 cm'] },
    'haljina-salome-mozaik': { 'Boja': ['teget'], 'Veličina': ['S', 'M', 'L'], 'Duzina haljine': ['125 cm'] },
    'haljina-big-beng': { 'Boja': ['zelene'], 'Veličina': ['M', 'L', 'XL'], 'Duzina haljine': ['120 cm'] },
    'kombinezon-savana': { 'Boja': ['krem'], 'Veličina': ['Free Size'], 'Oznake': ['kombinezon'], 'Duzina kombinezona': ['Standard'] },
    'palazzo-indigo': { 'Boja': ['teget'], 'Veličina': ['S/M', 'M/L', 'L/XL'], 'Oznake': ['palazzo', 'pantalone'], 'Duzina pantalona': ['105 cm'] },
    'kikoy-bela-kafa': { 'Boja': ['krem'] },
    'kozmetika-awali': { 'Gramaza': ['100 g'] },
    'mantil-primavera': { 'Veličina': ['M/L', 'L/XL'], 'Duzina mantila': ['105 cm'] },
    'suknja-primavera': { 'Boja': ['plava'], 'Veličina': ['S', 'M', 'L'], 'Oznake': ['suknja'], 'Duzina suknje': ['60 cm'] },
    'ceger-tribal': { 'Tip torbe': ['Rucna'] },
    'sandale-perlice': { 'Veličina obuce': ['37', '38', '39', '40', '41'] },
    'ogrlica-staklene-perle': { 'Oznake': ['nakit'] },
    'ogrlica-petra': { 'Oznake': ['nakit'] },
    'narukvica-krokodil': { 'Oznake': ['nakit'] }
  };
  window.PROIZVODI.forEach(function (p) { p.a = A[p.s] || {}; });
})();
