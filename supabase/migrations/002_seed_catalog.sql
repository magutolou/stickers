-- ============================================================
-- SEED: Álbum Panini Copa do Mundo 2026
-- Fonte: CNN Brasil (ordem exata do álbum físico)
-- ============================================================

-- Seção especial FWC
insert into teams (id, name, "group") values ('FWC', 'FIFA World Cup', 'FWC') on conflict do nothing;

-- Grupo A
insert into teams (id, name, "group") values
  ('MEX', 'México',            'A'),
  ('ZAF', 'África do Sul',     'A'),
  ('KOR', 'Coreia do Sul',     'A'),
  ('CZE', 'República Tcheca',  'A')
on conflict do nothing;

-- Grupo B
insert into teams (id, name, "group") values
  ('CAN', 'Canadá',                  'B'),
  ('BIH', 'Bósnia e Herzegovina',    'B'),
  ('QAT', 'Catar',                   'B'),
  ('SUI', 'Suíça',                   'B')
on conflict do nothing;

-- Grupo C
insert into teams (id, name, "group") values
  ('BRA', 'Brasil',    'C'),
  ('MAR', 'Marrocos',  'C'),
  ('HAI', 'Haiti',     'C'),
  ('SCO', 'Escócia',   'C')
on conflict do nothing;

-- Grupo D
insert into teams (id, name, "group") values
  ('USA', 'Estados Unidos',  'D'),
  ('PAR', 'Paraguai',        'D'),
  ('AUS', 'Austrália',       'D'),
  ('TUR', 'Turquia',         'D')
on conflict do nothing;

-- Grupo E
insert into teams (id, name, "group") values
  ('GER', 'Alemanha',        'E'),
  ('CUW', 'Curaçao',         'E'),
  ('CIV', 'Costa do Marfim', 'E'),
  ('ECU', 'Equador',         'E')
on conflict do nothing;

-- Grupo F
insert into teams (id, name, "group") values
  ('NED', 'Holanda',   'F'),
  ('JPN', 'Japão',     'F'),
  ('SWE', 'Suécia',    'F'),
  ('TUN', 'Tunísia',   'F')
on conflict do nothing;

-- Grupo G
insert into teams (id, name, "group") values
  ('BEL', 'Bélgica',     'G'),
  ('EGY', 'Egito',       'G'),
  ('IRN', 'Irã',         'G'),
  ('NZL', 'Nova Zelândia','G')
on conflict do nothing;

-- Grupo H
insert into teams (id, name, "group") values
  ('ESP', 'Espanha',     'H'),
  ('CPV', 'Cabo Verde',  'H'),
  ('KSA', 'Arábia Saudita','H'),
  ('URY', 'Uruguai',     'H')
on conflict do nothing;

-- Grupo I
insert into teams (id, name, "group") values
  ('FRA', 'França',   'I'),
  ('SEN', 'Senegal',  'I'),
  ('IRQ', 'Iraque',   'I'),
  ('NOR', 'Noruega',  'I')
on conflict do nothing;

-- Grupo J
insert into teams (id, name, "group") values
  ('ARG', 'Argentina',  'J'),
  ('ALG', 'Argélia',    'J'),
  ('AUT', 'Áustria',    'J'),
  ('JOR', 'Jordânia',   'J')
on conflict do nothing;

-- Grupo K
insert into teams (id, name, "group") values
  ('POR', 'Portugal',               'K'),
  ('COD', 'Rep. Democrática do Congo','K'),
  ('UZB', 'Uzbequistão',            'K'),
  ('COL', 'Colômbia',               'K')
on conflict do nothing;

-- Grupo L
insert into teams (id, name, "group") values
  ('ENG', 'Inglaterra',  'L'),
  ('CRO', 'Croácia',     'L'),
  ('GHA', 'Gana',        'L'),
  ('PAN', 'Panamá',      'L')
on conflict do nothing;

-- ============================================================
-- FIGURINHAS ESPECIAIS FWC
-- ============================================================
insert into stickers (id, team_id, number, player_name, is_special) values
  ('FWC-0',  'FWC', 0,  'We Are Panini',      true),
  ('FWC-1',  'FWC', 1,  'Emblema Oficial',    true),
  ('FWC-2',  'FWC', 2,  'Emblema Oficial',    true),
  ('FWC-3',  'FWC', 3,  'Mascotes Oficiais',  true),
  ('FWC-4',  'FWC', 4,  'Mascotes Oficiais',  true),
  ('FWC-5',  'FWC', 5,  'Troféu FIFA',        true),
  ('FWC-6',  'FWC', 6,  'Troféu FIFA',        true),
  ('FWC-7',  'FWC', 7,  'Estadio Azteca',     true),
  ('FWC-8',  'FWC', 8,  'AT&T Stadium',       true),
  ('FWC-9',  'FWC', 9,  'Rose Bowl',          true),
  ('FWC-10', 'FWC', 10, 'MetLife Stadium',    true),
  ('FWC-11', 'FWC', 11, 'SoFi Stadium',       true),
  ('FWC-12', 'FWC', 12, 'Levi''s Stadium',     true),
  ('FWC-13', 'FWC', 13, 'Arrowhead Stadium',  true),
  ('FWC-14', 'FWC', 14, 'Mercedes-Benz Stad.',true),
  ('FWC-15', 'FWC', 15, 'Allegiant Stadium',  true),
  ('FWC-16', 'FWC', 16, 'BC Place',           true),
  ('FWC-17', 'FWC', 17, 'BMO Field',          true),
  ('FWC-18', 'FWC', 18, 'Estádio Guadalajara',true),
  ('FWC-19', 'FWC', 19, 'Estádio Monterrey',  true)
on conflict do nothing;

-- ============================================================
-- JOGADORES POR SELEÇÃO
-- ============================================================

-- MEX - México
insert into stickers (id, team_id, number, player_name, is_special) values
  ('MEX-0',  'MEX', 0,  'Escudo México',      true),
  ('MEX-1',  'MEX', 1,  'Luis Malagón',       false),
  ('MEX-2',  'MEX', 2,  'Johan Vásquez',      false),
  ('MEX-3',  'MEX', 3,  'Jorge Sánchez',      false),
  ('MEX-4',  'MEX', 4,  'César Montes',       false),
  ('MEX-5',  'MEX', 5,  'Jesús Gallardo',     false),
  ('MEX-6',  'MEX', 6,  'Israel Reyes',       false),
  ('MEX-7',  'MEX', 7,  'Diego Lainez',       false),
  ('MEX-8',  'MEX', 8,  'Carlos Rodríguez',   false),
  ('MEX-9',  'MEX', 9,  'Edson Álvarez',      false),
  ('MEX-10', 'MEX', 10, 'Orbelín Pineda',     false),
  ('MEX-11', 'MEX', 11, 'Marcel Ruiz',        false),
  ('MEX-12', 'MEX', 12, 'Érick Sánchez',      false),
  ('MEX-13', 'MEX', 13, 'Hirving Lozano',     false),
  ('MEX-14', 'MEX', 14, 'Santiago Giménez',   false),
  ('MEX-15', 'MEX', 15, 'Raúl Jiménez',       false),
  ('MEX-16', 'MEX', 16, 'Alexis Vega',        false),
  ('MEX-17', 'MEX', 17, 'Roberto Alvarado',   false),
  ('MEX-18', 'MEX', 18, 'César Huerta',       false)
on conflict do nothing;

-- ZAF - África do Sul
insert into stickers (id, team_id, number, player_name, is_special) values
  ('ZAF-0',  'ZAF', 0,  'Escudo África do Sul',    true),
  ('ZAF-1',  'ZAF', 1,  'Ronwen Williams',          false),
  ('ZAF-2',  'ZAF', 2,  'Sipho Chaine',             false),
  ('ZAF-3',  'ZAF', 3,  'Aubrey Modiba',            false),
  ('ZAF-4',  'ZAF', 4,  'Samukele Kabini',          false),
  ('ZAF-5',  'ZAF', 5,  'Mbekezeli Mbokazi',        false),
  ('ZAF-6',  'ZAF', 6,  'Khulumani Ndamane',        false),
  ('ZAF-7',  'ZAF', 7,  'Siyabonga Ngezana',        false),
  ('ZAF-8',  'ZAF', 8,  'Khuliso Mudau',            false),
  ('ZAF-9',  'ZAF', 9,  'Nkosinathi Sibisi',        false),
  ('ZAF-10', 'ZAF', 10, 'Teboho Mokoena',           false),
  ('ZAF-11', 'ZAF', 11, 'Thalente Mbatha',          false),
  ('ZAF-12', 'ZAF', 12, 'Bathuisi Aubaas',          false),
  ('ZAF-13', 'ZAF', 13, 'Yaya Sithole',             false),
  ('ZAF-14', 'ZAF', 14, 'Sipho Mbule',              false),
  ('ZAF-15', 'ZAF', 15, 'Lyle Foster',              false),
  ('ZAF-16', 'ZAF', 16, 'Ioraam Rayners',           false),
  ('ZAF-17', 'ZAF', 17, 'Mohau Nkota',              false),
  ('ZAF-18', 'ZAF', 18, 'Oswin Appolis',            false)
on conflict do nothing;

-- KOR - Coreia do Sul
insert into stickers (id, team_id, number, player_name, is_special) values
  ('KOR-0',  'KOR', 0,  'Escudo Coreia do Sul', true),
  ('KOR-1',  'KOR', 1,  'Hyeon-woo Jo',         false),
  ('KOR-2',  'KOR', 2,  'Seung-Gyu Kim',        false),
  ('KOR-3',  'KOR', 3,  'Min-jae Kim',          false),
  ('KOR-4',  'KOR', 4,  'Yu-min Cho',           false),
  ('KOR-5',  'KOR', 5,  'Young-woo Seol',       false),
  ('KOR-6',  'KOR', 6,  'Han-beom Lee',         false),
  ('KOR-7',  'KOR', 7,  'Tae-seok Lee',         false),
  ('KOR-8',  'KOR', 8,  'Myung-jae Lee',        false),
  ('KOR-9',  'KOR', 9,  'Jae-sung Lee',         false),
  ('KOR-10', 'KOR', 10, 'In-beom Hwang',        false),
  ('KOR-11', 'KOR', 11, 'Kang-in Lee',          false),
  ('KOR-12', 'KOR', 12, 'Seung-ho Paik',        false),
  ('KOR-13', 'KOR', 13, 'Jens Castrop',         false),
  ('KOR-14', 'KOR', 14, 'Dong-gyeong Lee',      false),
  ('KOR-15', 'KOR', 15, 'Gue-sung Cho',         false),
  ('KOR-16', 'KOR', 16, 'Heung-min Son',        false),
  ('KOR-17', 'KOR', 17, 'Hee-chan Hwang',       false),
  ('KOR-18', 'KOR', 18, 'Hyeon-Gyu Oh',         false)
on conflict do nothing;

-- CZE - República Tcheca
insert into stickers (id, team_id, number, player_name, is_special) values
  ('CZE-0',  'CZE', 0,  'Escudo Rep. Tcheca',   true),
  ('CZE-1',  'CZE', 1,  'Matěj Kovář',           false),
  ('CZE-2',  'CZE', 2,  'Jindřích Staněk',        false),
  ('CZE-3',  'CZE', 3,  'Ladislav Krejčí',        false),
  ('CZE-4',  'CZE', 4,  'Vladimír Coufal',        false),
  ('CZE-5',  'CZE', 5,  'Jaroslav Zelený',        false),
  ('CZE-6',  'CZE', 6,  'Tomáš Holeš',            false),
  ('CZE-7',  'CZE', 7,  'David Zima',             false),
  ('CZE-8',  'CZE', 8,  'Michal Sadílek',         false),
  ('CZE-9',  'CZE', 9,  'Lukáš Provod',           false),
  ('CZE-10', 'CZE', 10, 'Lukáš Červ',             false),
  ('CZE-11', 'CZE', 11, 'Tomáš Souček',           false),
  ('CZE-12', 'CZE', 12, 'Pavel Šulc',             false),
  ('CZE-13', 'CZE', 13, 'Matěj Vydra',            false),
  ('CZE-14', 'CZE', 14, 'Vasil Kušej',            false),
  ('CZE-15', 'CZE', 15, 'Tomáš Chorý',            false),
  ('CZE-16', 'CZE', 16, 'Václav Černý',           false),
  ('CZE-17', 'CZE', 17, 'Adam Hložek',            false),
  ('CZE-18', 'CZE', 18, 'Patrik Schick',          false)
on conflict do nothing;

-- CAN - Canadá
insert into stickers (id, team_id, number, player_name, is_special) values
  ('CAN-0',  'CAN', 0,  'Escudo Canadá',         true),
  ('CAN-1',  'CAN', 1,  'Dayne St. Clair',        false),
  ('CAN-2',  'CAN', 2,  'Alphonso Davies',        false),
  ('CAN-3',  'CAN', 3,  'Alistair Johnston',      false),
  ('CAN-4',  'CAN', 4,  'Samuel Adekugbe',        false),
  ('CAN-5',  'CAN', 5,  'Richie Laryea',          false),
  ('CAN-6',  'CAN', 6,  'Derek Cornelius',        false),
  ('CAN-7',  'CAN', 7,  'Moïse Bombito',          false),
  ('CAN-8',  'CAN', 8,  'Kamal Miller',           false),
  ('CAN-9',  'CAN', 9,  'Stephen Eustáquio',      false),
  ('CAN-10', 'CAN', 10, 'Ismaël Koné',            false),
  ('CAN-11', 'CAN', 11, 'Jonathan Osorio',        false),
  ('CAN-12', 'CAN', 12, 'Jacob Shaffelburg',      false),
  ('CAN-13', 'CAN', 13, 'Mathieu Choinière',      false),
  ('CAN-14', 'CAN', 14, 'Niko Sigur',             false),
  ('CAN-15', 'CAN', 15, 'Tajon Buchanan',         false),
  ('CAN-16', 'CAN', 16, 'Liam Millar',            false),
  ('CAN-17', 'CAN', 17, 'Cyle Larin',             false),
  ('CAN-18', 'CAN', 18, 'Jonathan David',         false)
on conflict do nothing;

-- BIH - Bósnia e Herzegovina
insert into stickers (id, team_id, number, player_name, is_special) values
  ('BIH-0',  'BIH', 0,  'Escudo Bósnia',          true),
  ('BIH-1',  'BIH', 1,  'Nikola Vasilj',           false),
  ('BIH-2',  'BIH', 2,  'Amar Dedić',              false),
  ('BIH-3',  'BIH', 3,  'Sead Kolašinac',          false),
  ('BIH-4',  'BIH', 4,  'Tarik Muharemović',       false),
  ('BIH-5',  'BIH', 5,  'Nihad Mujakić',           false),
  ('BIH-6',  'BIH', 6,  'Nikola Katić',            false),
  ('BIH-7',  'BIH', 7,  'Amir Hadžiahmetović',     false),
  ('BIH-8',  'BIH', 8,  'Benjamin Tahirović',      false),
  ('BIH-9',  'BIH', 9,  'Armin Gigović',           false),
  ('BIH-10', 'BIH', 10, 'Ivan Šunjić',             false),
  ('BIH-11', 'BIH', 11, 'Ivan Bašić',              false),
  ('BIH-12', 'BIH', 12, 'Dženis Burnić',           false),
  ('BIH-13', 'BIH', 13, 'Esmir Bajraktarević',     false),
  ('BIH-14', 'BIH', 14, 'Amar Memić',              false),
  ('BIH-15', 'BIH', 15, 'Ermedin Demirović',       false),
  ('BIH-16', 'BIH', 16, 'Edin Džeko',              false),
  ('BIH-17', 'BIH', 17, 'Samed Baždar',            false),
  ('BIH-18', 'BIH', 18, 'Haris Tabaković',         false)
on conflict do nothing;

-- QAT - Catar
insert into stickers (id, team_id, number, player_name, is_special) values
  ('QAT-0',  'QAT', 0,  'Escudo Catar',           true),
  ('QAT-1',  'QAT', 1,  'Meshaal Barsham',         false),
  ('QAT-2',  'QAT', 2,  'Sultan Albrake',          false),
  ('QAT-3',  'QAT', 3,  'Lucas Mendes',            false),
  ('QAT-4',  'QAT', 4,  'Homam Ahmed',             false),
  ('QAT-5',  'QAT', 5,  'Boualem Khoukhi',         false),
  ('QAT-6',  'QAT', 6,  'Pedro Miguel',            false),
  ('QAT-7',  'QAT', 7,  'Tarek Salman',            false),
  ('QAT-8',  'QAT', 8,  'Mohamed Al-Mannai',       false),
  ('QAT-9',  'QAT', 9,  'Karim Boudiaf',           false),
  ('QAT-10', 'QAT', 10, 'Assim Madibo',            false),
  ('QAT-11', 'QAT', 11, 'Ahmed Fatehi',            false),
  ('QAT-12', 'QAT', 12, 'Mohammed Waad',           false),
  ('QAT-13', 'QAT', 13, 'Abdulaziz Hatem',         false),
  ('QAT-14', 'QAT', 14, 'Hassan Al-Haydos',        false),
  ('QAT-15', 'QAT', 15, 'Edmilson Junior',         false),
  ('QAT-16', 'QAT', 16, 'Akram Hassan Afif',       false),
  ('QAT-17', 'QAT', 17, 'Ahmed Al Ganehi',         false),
  ('QAT-18', 'QAT', 18, 'Almoez Ali',              false)
on conflict do nothing;

-- SUI - Suíça
insert into stickers (id, team_id, number, player_name, is_special) values
  ('SUI-0',  'SUI', 0,  'Escudo Suíça',       true),
  ('SUI-1',  'SUI', 1,  'Gregor Kobel',        false),
  ('SUI-2',  'SUI', 2,  'Yvon Mvogo',          false),
  ('SUI-3',  'SUI', 3,  'Manuel Akanji',       false),
  ('SUI-4',  'SUI', 4,  'Ricardo Rodriguez',   false),
  ('SUI-5',  'SUI', 5,  'Nico Elvedi',         false),
  ('SUI-6',  'SUI', 6,  'Aurèle Amenda',       false),
  ('SUI-7',  'SUI', 7,  'Silvan Widmer',       false),
  ('SUI-8',  'SUI', 8,  'Granit Xhaka',        false),
  ('SUI-9',  'SUI', 9,  'Denis Zakaria',       false),
  ('SUI-10', 'SUI', 10, 'Remo Freuler',        false),
  ('SUI-11', 'SUI', 11, 'Fabian Rieder',       false),
  ('SUI-12', 'SUI', 12, 'Ardon Jashari',       false),
  ('SUI-13', 'SUI', 13, 'Johan Manzambi',      false),
  ('SUI-14', 'SUI', 14, 'Michel Aebischer',    false),
  ('SUI-15', 'SUI', 15, 'Breel Embolo',        false),
  ('SUI-16', 'SUI', 16, 'Ruben Vargas',        false),
  ('SUI-17', 'SUI', 17, 'Dan Ndoye',           false),
  ('SUI-18', 'SUI', 18, 'Zeki Amdouni',        false)
on conflict do nothing;

-- BRA - Brasil
insert into stickers (id, team_id, number, player_name, is_special) values
  ('BRA-0',  'BRA', 0,  'Escudo Brasil',      true),
  ('BRA-1',  'BRA', 1,  'Alisson',            false),
  ('BRA-2',  'BRA', 2,  'Bento',              false),
  ('BRA-3',  'BRA', 3,  'Marquinhos',         false),
  ('BRA-4',  'BRA', 4,  'Éder Militão',       false),
  ('BRA-5',  'BRA', 5,  'Gabriel Magalhães',  false),
  ('BRA-6',  'BRA', 6,  'Danilo',             false),
  ('BRA-7',  'BRA', 7,  'Wesley',             false),
  ('BRA-8',  'BRA', 8,  'Lucas Paquetá',      false),
  ('BRA-9',  'BRA', 9,  'Casemiro',           false),
  ('BRA-10', 'BRA', 10, 'Bruno Guimarães',    false),
  ('BRA-11', 'BRA', 11, 'Luiz Henrique',      false),
  ('BRA-12', 'BRA', 12, 'Vinícius Júnior',    false),
  ('BRA-13', 'BRA', 13, 'Rodrygo',            false),
  ('BRA-14', 'BRA', 14, 'João Pedro',         false),
  ('BRA-15', 'BRA', 15, 'Matheus Cunha',      false),
  ('BRA-16', 'BRA', 16, 'Gabriel Martinelli', false),
  ('BRA-17', 'BRA', 17, 'Raphinha',           false),
  ('BRA-18', 'BRA', 18, 'Estêvão',            false)
on conflict do nothing;

-- MAR - Marrocos
insert into stickers (id, team_id, number, player_name, is_special) values
  ('MAR-0',  'MAR', 0,  'Escudo Marrocos',       true),
  ('MAR-1',  'MAR', 1,  'Yassine Bounou',         false),
  ('MAR-2',  'MAR', 2,  'Munir El Kajoui',        false),
  ('MAR-3',  'MAR', 3,  'Achraf Hakimi',          false),
  ('MAR-4',  'MAR', 4,  'Noussair Mazraoui',      false),
  ('MAR-5',  'MAR', 5,  'Nayef Aguerd',           false),
  ('MAR-6',  'MAR', 6,  'Romain Saïss',           false),
  ('MAR-7',  'MAR', 7,  'Jawad El Yamiq',         false),
  ('MAR-8',  'MAR', 8,  'Adam Masina',            false),
  ('MAR-9',  'MAR', 9,  'Sofyan Amrabat',         false),
  ('MAR-10', 'MAR', 10, 'Azzedine Ounahi',        false),
  ('MAR-11', 'MAR', 11, 'Eliesse Ben Seghir',     false),
  ('MAR-12', 'MAR', 12, 'Bilal El Khannouss',     false),
  ('MAR-13', 'MAR', 13, 'Ismael Saibari',         false),
  ('MAR-14', 'MAR', 14, 'Youssef En-Nesyri',      false),
  ('MAR-15', 'MAR', 15, 'Abde Ezzalzouli',        false),
  ('MAR-16', 'MAR', 16, 'Soufiane Rahimi',        false),
  ('MAR-17', 'MAR', 17, 'Brahim Díaz',            false),
  ('MAR-18', 'MAR', 18, 'Ayoub El Kaabi',         false)
on conflict do nothing;

-- HAI - Haiti
insert into stickers (id, team_id, number, player_name, is_special) values
  ('HAI-0',  'HAI', 0,  'Escudo Haiti',           true),
  ('HAI-1',  'HAI', 1,  'Johny Placide',           false),
  ('HAI-2',  'HAI', 2,  'Carlens Arcus',           false),
  ('HAI-3',  'HAI', 3,  'Martin Expérience',       false),
  ('HAI-4',  'HAI', 4,  'Jean-Kevin Duverne',      false),
  ('HAI-5',  'HAI', 5,  'Ricardo Adé',             false),
  ('HAI-6',  'HAI', 6,  'Duke Lacroix',            false),
  ('HAI-7',  'HAI', 7,  'Garven Metusala',         false),
  ('HAI-8',  'HAI', 8,  'Hannes Delcroix',         false),
  ('HAI-9',  'HAI', 9,  'Leverton Pierre',         false),
  ('HAI-10', 'HAI', 10, 'Danley Jean Jacques',     false),
  ('HAI-11', 'HAI', 11, 'Jean-Ricner Bellegarde',  false),
  ('HAI-12', 'HAI', 12, 'Christopher Attys',       false),
  ('HAI-13', 'HAI', 13, 'Derrick Etienne Jr.',     false),
  ('HAI-14', 'HAI', 14, 'Josué Casimir',           false),
  ('HAI-15', 'HAI', 15, 'Ruben Providence',        false),
  ('HAI-16', 'HAI', 16, 'Duckens Nazon',           false),
  ('HAI-17', 'HAI', 17, 'Louicius Deedson',        false),
  ('HAI-18', 'HAI', 18, 'Frantzdy Pierrot',        false)
on conflict do nothing;

-- SCO - Escócia
insert into stickers (id, team_id, number, player_name, is_special) values
  ('SCO-0',  'SCO', 0,  'Escudo Escócia',      true),
  ('SCO-1',  'SCO', 1,  'Angus Gunn',           false),
  ('SCO-2',  'SCO', 2,  'Jack Hendry',          false),
  ('SCO-3',  'SCO', 3,  'Kieran Tierney',       false),
  ('SCO-4',  'SCO', 4,  'Aaron Hickey',         false),
  ('SCO-5',  'SCO', 5,  'Andrew Robertson',     false),
  ('SCO-6',  'SCO', 6,  'Scott McKenna',        false),
  ('SCO-7',  'SCO', 7,  'John Souttar',         false),
  ('SCO-8',  'SCO', 8,  'Anthony Ralston',      false),
  ('SCO-9',  'SCO', 9,  'Grant Hanley',         false),
  ('SCO-10', 'SCO', 10, 'Scott McTominay',      false),
  ('SCO-11', 'SCO', 11, 'Billy Gilmour',        false),
  ('SCO-12', 'SCO', 12, 'Lewis Ferguson',       false),
  ('SCO-13', 'SCO', 13, 'Ryan Christie',        false),
  ('SCO-14', 'SCO', 14, 'Kenny McLean',         false),
  ('SCO-15', 'SCO', 15, 'John McGinn',          false),
  ('SCO-16', 'SCO', 16, 'Lyndon Dykes',         false),
  ('SCO-17', 'SCO', 17, 'Che Adams',            false),
  ('SCO-18', 'SCO', 18, 'Ben Gannon-Doak',      false)
on conflict do nothing;

-- USA - Estados Unidos
insert into stickers (id, team_id, number, player_name, is_special) values
  ('USA-0',  'USA', 0,  'Escudo EUA',           true),
  ('USA-1',  'USA', 1,  'Matt Freese',           false),
  ('USA-2',  'USA', 2,  'Chris Richards',        false),
  ('USA-3',  'USA', 3,  'Tim Ream',              false),
  ('USA-4',  'USA', 4,  'Mark McKenzie',         false),
  ('USA-5',  'USA', 5,  'Alex Freeman',          false),
  ('USA-6',  'USA', 6,  'Antonee Robinson',      false),
  ('USA-7',  'USA', 7,  'Tyler Adams',           false),
  ('USA-8',  'USA', 8,  'Tanner Tessmann',       false),
  ('USA-9',  'USA', 9,  'Weston McKennie',       false),
  ('USA-10', 'USA', 10, 'Christian Roldan',      false),
  ('USA-11', 'USA', 11, 'Timothy Weah',          false),
  ('USA-12', 'USA', 12, 'Diego Luna',            false),
  ('USA-13', 'USA', 13, 'Malik Tillman',         false),
  ('USA-14', 'USA', 14, 'Christian Pulisic',     false),
  ('USA-15', 'USA', 15, 'Brenden Aaronson',      false),
  ('USA-16', 'USA', 16, 'Ricardo Pepi',          false),
  ('USA-17', 'USA', 17, 'Haji Wright',           false),
  ('USA-18', 'USA', 18, 'Folarin Balogun',       false)
on conflict do nothing;

-- PAR - Paraguai
insert into stickers (id, team_id, number, player_name, is_special) values
  ('PAR-0',  'PAR', 0,  'Escudo Paraguai',      true),
  ('PAR-1',  'PAR', 1,  'Roberto Fernández',     false),
  ('PAR-2',  'PAR', 2,  'Orlando Gill',          false),
  ('PAR-3',  'PAR', 3,  'Gustavo Gómez',         false),
  ('PAR-4',  'PAR', 4,  'Fabián Balbuena',       false),
  ('PAR-5',  'PAR', 5,  'Juan José Cáceres',     false),
  ('PAR-6',  'PAR', 6,  'Omar Alderete',         false),
  ('PAR-7',  'PAR', 7,  'Junior Alonso',         false),
  ('PAR-8',  'PAR', 8,  'Mathías Villasanti',    false),
  ('PAR-9',  'PAR', 9,  'Diego Gómez',           false),
  ('PAR-10', 'PAR', 10, 'Damián Bobadilla',      false),
  ('PAR-11', 'PAR', 11, 'Andrés Cubas',          false),
  ('PAR-12', 'PAR', 12, 'Matías Galarza',        false),
  ('PAR-13', 'PAR', 13, 'Julio Enciso',          false),
  ('PAR-14', 'PAR', 14, 'Miguel Almirón',        false),
  ('PAR-15', 'PAR', 15, 'Óscar Romero',          false),
  ('PAR-16', 'PAR', 16, 'Antonio Sanabria',      false),
  ('PAR-17', 'PAR', 17, 'Carlos González',       false),
  ('PAR-18', 'PAR', 18, 'Alejandro Romero',      false)
on conflict do nothing;

-- AUS - Austrália
insert into stickers (id, team_id, number, player_name, is_special) values
  ('AUS-0',  'AUS', 0,  'Escudo Austrália',      true),
  ('AUS-1',  'AUS', 1,  'Mathew Ryan',            false),
  ('AUS-2',  'AUS', 2,  'Joe Gauci',              false),
  ('AUS-3',  'AUS', 3,  'Harry Souttar',          false),
  ('AUS-4',  'AUS', 4,  'Alessandro Circati',     false),
  ('AUS-5',  'AUS', 5,  'Jordan Bos',             false),
  ('AUS-6',  'AUS', 6,  'Aziz Behich',            false),
  ('AUS-7',  'AUS', 7,  'Cameron Burgess',        false),
  ('AUS-8',  'AUS', 8,  'Lewis Miller',           false),
  ('AUS-9',  'AUS', 9,  'Milos Degenek',          false),
  ('AUS-10', 'AUS', 10, 'Jackson Irvine',         false),
  ('AUS-11', 'AUS', 11, 'Riley McGree',           false),
  ('AUS-12', 'AUS', 12, 'Aiden O''Neill',          false),
  ('AUS-13', 'AUS', 13, 'Connor Metcalfe',        false),
  ('AUS-14', 'AUS', 14, 'Patrick Yazbek',         false),
  ('AUS-15', 'AUS', 15, 'Craig Goodwin',          false),
  ('AUS-16', 'AUS', 16, 'Kusini Yengi',           false),
  ('AUS-17', 'AUS', 17, 'Nestory Irankunda',      false),
  ('AUS-18', 'AUS', 18, 'Mohamed Touré',          false)
on conflict do nothing;

-- TUR - Turquia
insert into stickers (id, team_id, number, player_name, is_special) values
  ('TUR-0',  'TUR', 0,  'Escudo Turquia',         true),
  ('TUR-1',  'TUR', 1,  'Ugurcan Cakir',           false),
  ('TUR-2',  'TUR', 2,  'Mert Muldur',             false),
  ('TUR-3',  'TUR', 3,  'Zeki Celik',              false),
  ('TUR-4',  'TUR', 4,  'Abdulkerim Bardakci',     false),
  ('TUR-5',  'TUR', 5,  'Caglar Soyuncu',          false),
  ('TUR-6',  'TUR', 6,  'Merih Demiral',           false),
  ('TUR-7',  'TUR', 7,  'Ferdi Kadioglu',          false),
  ('TUR-8',  'TUR', 8,  'Kaan Ayhan',              false),
  ('TUR-9',  'TUR', 9,  'Ismail Yuksek',           false),
  ('TUR-10', 'TUR', 10, 'Hakan Calhanoglu',        false),
  ('TUR-11', 'TUR', 11, 'Orkun Kokcu',             false),
  ('TUR-12', 'TUR', 12, 'Arda Güler',              false),
  ('TUR-13', 'TUR', 13, 'Irfan Can Kahveci',       false),
  ('TUR-14', 'TUR', 14, 'Yunus Akgun',             false),
  ('TUR-15', 'TUR', 15, 'Can Uzun',                false),
  ('TUR-16', 'TUR', 16, 'Baris Alper Yilmaz',      false),
  ('TUR-17', 'TUR', 17, 'Kerem Akturkoglu',        false),
  ('TUR-18', 'TUR', 18, 'Kenan Yildiz',            false)
on conflict do nothing;

-- GER - Alemanha
insert into stickers (id, team_id, number, player_name, is_special) values
  ('GER-0',  'GER', 0,  'Escudo Alemanha',        true),
  ('GER-1',  'GER', 1,  'Marc-André ter Stegen',  false),
  ('GER-2',  'GER', 2,  'Jonathan Tah',           false),
  ('GER-3',  'GER', 3,  'David Raum',             false),
  ('GER-4',  'GER', 4,  'Nico Schlotterbeck',     false),
  ('GER-5',  'GER', 5,  'Antonio Rüdiger',        false),
  ('GER-6',  'GER', 6,  'Waldemar Anton',         false),
  ('GER-7',  'GER', 7,  'Ridle Baku',             false),
  ('GER-8',  'GER', 8,  'Maximilian Mittelstädt', false),
  ('GER-9',  'GER', 9,  'Joshua Kimmich',         false),
  ('GER-10', 'GER', 10, 'Florian Wirtz',          false),
  ('GER-11', 'GER', 11, 'Felix Nmecha',           false),
  ('GER-12', 'GER', 12, 'Leon Goretzka',          false),
  ('GER-13', 'GER', 13, 'Jamal Musiala',          false),
  ('GER-14', 'GER', 14, 'Serge Gnabry',           false),
  ('GER-15', 'GER', 15, 'Kai Havertz',            false),
  ('GER-16', 'GER', 16, 'Leroy Sané',             false),
  ('GER-17', 'GER', 17, 'Karim Adeyemi',          false),
  ('GER-18', 'GER', 18, 'Nick Woltemade',         false)
on conflict do nothing;

-- CUW - Curaçao
insert into stickers (id, team_id, number, player_name, is_special) values
  ('CUW-0',  'CUW', 0,  'Escudo Curaçao',        true),
  ('CUW-1',  'CUW', 1,  'Eloy Room',              false),
  ('CUW-2',  'CUW', 2,  'Armando Obispo',         false),
  ('CUW-3',  'CUW', 3,  'Sherel Floranus',        false),
  ('CUW-4',  'CUW', 4,  'Jurien Gaari',           false),
  ('CUW-5',  'CUW', 5,  'Joshua Brenet',          false),
  ('CUW-6',  'CUW', 6,  'Roshon Van Eijma',       false),
  ('CUW-7',  'CUW', 7,  'Shurandy Sambo',         false),
  ('CUW-8',  'CUW', 8,  'Livano Comenencia',      false),
  ('CUW-9',  'CUW', 9,  'Godfried Roemeratoe',    false),
  ('CUW-10', 'CUW', 10, 'Juninho Bacuna',         false),
  ('CUW-11', 'CUW', 11, 'Leandro Bacuna',         false),
  ('CUW-12', 'CUW', 12, 'Tahith Chong',           false),
  ('CUW-13', 'CUW', 13, 'Kenji Gorré',            false),
  ('CUW-14', 'CUW', 14, 'Jearl Margaritha',       false),
  ('CUW-15', 'CUW', 15, 'Jurgen Locadia',         false),
  ('CUW-16', 'CUW', 16, 'Jeremy Antonisse',       false),
  ('CUW-17', 'CUW', 17, 'Gervane Kastaneer',      false),
  ('CUW-18', 'CUW', 18, 'Sontje Hansen',          false)
on conflict do nothing;

-- CIV - Costa do Marfim
insert into stickers (id, team_id, number, player_name, is_special) values
  ('CIV-0',  'CIV', 0,  'Escudo Costa do Marfim', true),
  ('CIV-1',  'CIV', 1,  'Yahia Fofana',            false),
  ('CIV-2',  'CIV', 2,  'Ghislain Konan',          false),
  ('CIV-3',  'CIV', 3,  'Wilfried Singo',          false),
  ('CIV-4',  'CIV', 4,  'Odilon Kossounou',        false),
  ('CIV-5',  'CIV', 5,  'Evan Ndicka',             false),
  ('CIV-6',  'CIV', 6,  'Willy Boly',              false),
  ('CIV-7',  'CIV', 7,  'Emmanuel Agbadou',        false),
  ('CIV-8',  'CIV', 8,  'Ousmane Diomande',        false),
  ('CIV-9',  'CIV', 9,  'Franck Kessié',           false),
  ('CIV-10', 'CIV', 10, 'Seko Fofana',             false),
  ('CIV-11', 'CIV', 11, 'Ibrahim Sangaré',         false),
  ('CIV-12', 'CIV', 12, 'Jean-Philippe Gbamin',    false),
  ('CIV-13', 'CIV', 13, 'Amad Diallo',             false),
  ('CIV-14', 'CIV', 14, 'Sébastien Haller',        false),
  ('CIV-15', 'CIV', 15, 'Simon Adingra',           false),
  ('CIV-16', 'CIV', 16, 'Yan Diomande',            false),
  ('CIV-17', 'CIV', 17, 'Evann Guessand',          false),
  ('CIV-18', 'CIV', 18, 'Oumar Diakité',           false)
on conflict do nothing;

-- ECU - Equador
insert into stickers (id, team_id, number, player_name, is_special) values
  ('ECU-0',  'ECU', 0,  'Escudo Equador',         true),
  ('ECU-1',  'ECU', 1,  'Hernán Galíndez',         false),
  ('ECU-2',  'ECU', 2,  'Gonzalo Valle',           false),
  ('ECU-3',  'ECU', 3,  'Piero Hincapié',          false),
  ('ECU-4',  'ECU', 4,  'Pervis Estupiñán',        false),
  ('ECU-5',  'ECU', 5,  'Willian Pacho',           false),
  ('ECU-6',  'ECU', 6,  'Ángelo Preciado',         false),
  ('ECU-7',  'ECU', 7,  'Joel Ordóñez',            false),
  ('ECU-8',  'ECU', 8,  'Moisés Caicedo',          false),
  ('ECU-9',  'ECU', 9,  'Alan Franco',             false),
  ('ECU-10', 'ECU', 10, 'Kendry Páez',             false),
  ('ECU-11', 'ECU', 11, 'Pedro Vite',              false),
  ('ECU-12', 'ECU', 12, 'John Veboah',             false),
  ('ECU-13', 'ECU', 13, 'Leonardo Campana',        false),
  ('ECU-14', 'ECU', 14, 'Gonzalo Plata',           false),
  ('ECU-15', 'ECU', 15, 'Nilson Angulo',           false),
  ('ECU-16', 'ECU', 16, 'Alan Minda',              false),
  ('ECU-17', 'ECU', 17, 'Kevin Rodríguez',         false),
  ('ECU-18', 'ECU', 18, 'Enner Valencia',          false)
on conflict do nothing;

-- NED - Holanda
insert into stickers (id, team_id, number, player_name, is_special) values
  ('NED-0',  'NED', 0,  'Escudo Holanda',         true),
  ('NED-1',  'NED', 1,  'Bart Verbruggen',         false),
  ('NED-2',  'NED', 2,  'Virgil van Dijk',         false),
  ('NED-3',  'NED', 3,  'Micky van de Ven',        false),
  ('NED-4',  'NED', 4,  'Jurriën Timber',          false),
  ('NED-5',  'NED', 5,  'Denzel Dumfries',         false),
  ('NED-6',  'NED', 6,  'Nathan Aké',              false),
  ('NED-7',  'NED', 7,  'Jeremie Frimpong',        false),
  ('NED-8',  'NED', 8,  'Jan Paul van Hecke',      false),
  ('NED-9',  'NED', 9,  'Tijjani Reijnders',       false),
  ('NED-10', 'NED', 10, 'Ryan Gravenberch',        false),
  ('NED-11', 'NED', 11, 'Teun Koopmeiners',        false),
  ('NED-12', 'NED', 12, 'Frenkie de Jong',         false),
  ('NED-13', 'NED', 13, 'Xavi Simons',             false),
  ('NED-14', 'NED', 14, 'Justin Kluivert',         false),
  ('NED-15', 'NED', 15, 'Memphis Depay',           false),
  ('NED-16', 'NED', 16, 'Donyell Malen',           false),
  ('NED-17', 'NED', 17, 'Wout Weghorst',           false),
  ('NED-18', 'NED', 18, 'Cody Gakpo',              false)
on conflict do nothing;

-- JPN - Japão
insert into stickers (id, team_id, number, player_name, is_special) values
  ('JPN-0',  'JPN', 0,  'Escudo Japão',           true),
  ('JPN-1',  'JPN', 1,  'Zion Suzuki',             false),
  ('JPN-2',  'JPN', 2,  'Henry Heroki Mochizuki',  false),
  ('JPN-3',  'JPN', 3,  'Ayumu Seko',              false),
  ('JPN-4',  'JPN', 4,  'Junnosuke Suzuki',        false),
  ('JPN-5',  'JPN', 5,  'Shogo Taniguchi',         false),
  ('JPN-6',  'JPN', 6,  'Tsuyoshi Watanabe',       false),
  ('JPN-7',  'JPN', 7,  'Kaishu Sano',             false),
  ('JPN-8',  'JPN', 8,  'Yuki Soma',               false),
  ('JPN-9',  'JPN', 9,  'Ao Tanaka',               false),
  ('JPN-10', 'JPN', 10, 'Daichi Kamada',           false),
  ('JPN-11', 'JPN', 11, 'Takefusa Kubo',           false),
  ('JPN-12', 'JPN', 12, 'Ritsu Doan',              false),
  ('JPN-13', 'JPN', 13, 'Keito Nakamura',          false),
  ('JPN-14', 'JPN', 14, 'Takumi Minamino',         false),
  ('JPN-15', 'JPN', 15, 'Shuto Machino',           false),
  ('JPN-16', 'JPN', 16, 'Junya Ito',               false),
  ('JPN-17', 'JPN', 17, 'Koki Ogawa',              false),
  ('JPN-18', 'JPN', 18, 'Ayase Ueda',              false)
on conflict do nothing;

-- SWE - Suécia
insert into stickers (id, team_id, number, player_name, is_special) values
  ('SWE-0',  'SWE', 0,  'Escudo Suécia',          true),
  ('SWE-1',  'SWE', 1,  'Victor Johansson',        false),
  ('SWE-2',  'SWE', 2,  'Isak Hien',               false),
  ('SWE-3',  'SWE', 3,  'Gabriel Gudmundsson',     false),
  ('SWE-4',  'SWE', 4,  'Emil Holm',               false),
  ('SWE-5',  'SWE', 5,  'Victor Nilsson Lindelöf', false),
  ('SWE-6',  'SWE', 6,  'Gustaf Lagerbielke',      false),
  ('SWE-7',  'SWE', 7,  'Lucas Bergvall',          false),
  ('SWE-8',  'SWE', 8,  'Hugo Larsson',            false),
  ('SWE-9',  'SWE', 9,  'Jesper Karlström',        false),
  ('SWE-10', 'SWE', 10, 'Yasin Ayari',             false),
  ('SWE-11', 'SWE', 11, 'Mattias Svanberg',        false),
  ('SWE-12', 'SWE', 12, 'Daniel Svensson',         false),
  ('SWE-13', 'SWE', 13, 'Ken Sema',                false),
  ('SWE-14', 'SWE', 14, 'Roony Bardghji',          false),
  ('SWE-15', 'SWE', 15, 'Dejan Kulusevski',        false),
  ('SWE-16', 'SWE', 16, 'Anthony Elanga',          false),
  ('SWE-17', 'SWE', 17, 'Alexander Isak',          false),
  ('SWE-18', 'SWE', 18, 'Viktor Gyökeres',         false)
on conflict do nothing;

-- TUN - Tunísia
insert into stickers (id, team_id, number, player_name, is_special) values
  ('TUN-0',  'TUN', 0,  'Escudo Tunísia',         true),
  ('TUN-1',  'TUN', 1,  'Bechir Ben Said',         false),
  ('TUN-2',  'TUN', 2,  'Aymen Dahmen',            false),
  ('TUN-3',  'TUN', 3,  'Van Valery',              false),
  ('TUN-4',  'TUN', 4,  'Montassar Talbi',         false),
  ('TUN-5',  'TUN', 5,  'Yassine Meriah',          false),
  ('TUN-6',  'TUN', 6,  'Ali Abdi',                false),
  ('TUN-7',  'TUN', 7,  'Dylan Bronn',             false),
  ('TUN-8',  'TUN', 8,  'Ellyes Skhiri',           false),
  ('TUN-9',  'TUN', 9,  'Aissa Laidouni',          false),
  ('TUN-10', 'TUN', 10, 'Ferjani Sassi',           false),
  ('TUN-11', 'TUN', 11, 'Mohamed Ali Ben Romdhane',false),
  ('TUN-12', 'TUN', 12, 'Hannibal Mejbri',         false),
  ('TUN-13', 'TUN', 13, 'Elias Achouri',           false),
  ('TUN-14', 'TUN', 14, 'Elias Saad',              false),
  ('TUN-15', 'TUN', 15, 'Hazem Mastouri',          false),
  ('TUN-16', 'TUN', 16, 'Ismael Gharbi',           false),
  ('TUN-17', 'TUN', 17, 'Sayfallah Ltaief',        false),
  ('TUN-18', 'TUN', 18, 'Naim Sliti',              false)
on conflict do nothing;

-- BEL - Bélgica
insert into stickers (id, team_id, number, player_name, is_special) values
  ('BEL-0',  'BEL', 0,  'Escudo Bélgica',          true),
  ('BEL-1',  'BEL', 1,  'Thibaut Courtois',         false),
  ('BEL-2',  'BEL', 2,  'Arthur Theate',            false),
  ('BEL-3',  'BEL', 3,  'Timothy Castagne',         false),
  ('BEL-4',  'BEL', 4,  'Zeno Debast',              false),
  ('BEL-5',  'BEL', 5,  'Brandon Mechele',          false),
  ('BEL-6',  'BEL', 6,  'Maxim De Cuyper',          false),
  ('BEL-7',  'BEL', 7,  'Thomas Meunier',           false),
  ('BEL-8',  'BEL', 8,  'Youri Tielemans',          false),
  ('BEL-9',  'BEL', 9,  'Amadou Onana',             false),
  ('BEL-10', 'BEL', 10, 'Nicolas Raskin',           false),
  ('BEL-11', 'BEL', 11, 'Alexis Saelemaekers',      false),
  ('BEL-12', 'BEL', 12, 'Hans Vanaken',             false),
  ('BEL-13', 'BEL', 13, 'Kevin De Bruyne',          false),
  ('BEL-14', 'BEL', 14, 'Jérémy Doku',              false),
  ('BEL-15', 'BEL', 15, 'Charles De Ketelaere',     false),
  ('BEL-16', 'BEL', 16, 'Leandro Trossard',         false),
  ('BEL-17', 'BEL', 17, 'Loïs Openda',              false),
  ('BEL-18', 'BEL', 18, 'Romelu Lukaku',            false)
on conflict do nothing;

-- EGY - Egito
insert into stickers (id, team_id, number, player_name, is_special) values
  ('EGY-0',  'EGY', 0,  'Escudo Egito',            true),
  ('EGY-1',  'EGY', 1,  'Mohamed El Shenawy',       false),
  ('EGY-2',  'EGY', 2,  'Mohamed Hany',             false),
  ('EGY-3',  'EGY', 3,  'Mohamed Hamdy',            false),
  ('EGY-4',  'EGY', 4,  'Yasser Ibrahim',           false),
  ('EGY-5',  'EGY', 5,  'Khaled Sobhi',             false),
  ('EGY-6',  'EGY', 6,  'Ramy Rabia',               false),
  ('EGY-7',  'EGY', 7,  'Hossam Abdelmaguid',       false),
  ('EGY-8',  'EGY', 8,  'Ahmed Fatouh',             false),
  ('EGY-9',  'EGY', 9,  'Marwan Attia',             false),
  ('EGY-10', 'EGY', 10, 'Zizo',                     false),
  ('EGY-11', 'EGY', 11, 'Hamdy Fathy',              false),
  ('EGY-12', 'EGY', 12, 'Mohamed Lasheen',          false),
  ('EGY-13', 'EGY', 13, 'Emam Ashour',              false),
  ('EGY-14', 'EGY', 14, 'Osama Faisal',             false),
  ('EGY-15', 'EGY', 15, 'Mohamed Salah',            false),
  ('EGY-16', 'EGY', 16, 'Mostafa Mohamed',          false),
  ('EGY-17', 'EGY', 17, 'Trezeguet',                false),
  ('EGY-18', 'EGY', 18, 'Omar Marmoush',            false)
on conflict do nothing;

-- IRN - Irã
insert into stickers (id, team_id, number, player_name, is_special) values
  ('IRN-0',  'IRN', 0,  'Escudo Irã',              true),
  ('IRN-1',  'IRN', 1,  'Alireza Beiranvand',       false),
  ('IRN-2',  'IRN', 2,  'Morteza Pouraliganji',     false),
  ('IRN-3',  'IRN', 3,  'Ehsan Hajsafi',            false),
  ('IRN-4',  'IRN', 4,  'Milad Mohammadi',          false),
  ('IRN-5',  'IRN', 5,  'Shoja Khalilzadeh',        false),
  ('IRN-6',  'IRN', 6,  'Ramin Rezaeian',           false),
  ('IRN-7',  'IRN', 7,  'Hossein Kanaani',          false),
  ('IRN-8',  'IRN', 8,  'Sadegh Moharrami',         false),
  ('IRN-9',  'IRN', 9,  'Saleh Hardani',            false),
  ('IRN-10', 'IRN', 10, 'Saeed Ezatolahi',          false),
  ('IRN-11', 'IRN', 11, 'Saman Ghoddos',            false),
  ('IRN-12', 'IRN', 12, 'Omid Noorafkan',           false),
  ('IRN-13', 'IRN', 13, 'Roozbeh Cheshmi',          false),
  ('IRN-14', 'IRN', 14, 'Mohammad Mohebi',          false),
  ('IRN-15', 'IRN', 15, 'Sardar Azmoun',            false),
  ('IRN-16', 'IRN', 16, 'Mehdi Taremi',             false),
  ('IRN-17', 'IRN', 17, 'Alireza Jahanbakhsh',      false),
  ('IRN-18', 'IRN', 18, 'Ali Gholizadeh',           false)
on conflict do nothing;

-- NZL - Nova Zelândia
insert into stickers (id, team_id, number, player_name, is_special) values
  ('NZL-0',  'NZL', 0,  'Escudo Nova Zelândia',    true),
  ('NZL-1',  'NZL', 1,  'Max Crocombe-Payne',       false),
  ('NZL-2',  'NZL', 2,  'Alex Paulsen',             false),
  ('NZL-3',  'NZL', 3,  'Michael Boxall',           false),
  ('NZL-4',  'NZL', 4,  'Liberato Cacace',          false),
  ('NZL-5',  'NZL', 5,  'Tim Payne',                false),
  ('NZL-6',  'NZL', 6,  'Tyler Bindon',             false),
  ('NZL-7',  'NZL', 7,  'Francis de Vries',         false),
  ('NZL-8',  'NZL', 8,  'Finn Surman',              false),
  ('NZL-9',  'NZL', 9,  'Joe Bell',                 false),
  ('NZL-10', 'NZL', 10, 'Sarpreet Singh',           false),
  ('NZL-11', 'NZL', 11, 'Ryan Thomas',              false),
  ('NZL-12', 'NZL', 12, 'Matthew Garbett',          false),
  ('NZL-13', 'NZL', 13, 'Marko Stamenić',           false),
  ('NZL-14', 'NZL', 14, 'Ben Old',                  false),
  ('NZL-15', 'NZL', 15, 'Chris Wood',               false),
  ('NZL-16', 'NZL', 16, 'Elijah Just',              false),
  ('NZL-17', 'NZL', 17, 'Callum McCowatt',          false),
  ('NZL-18', 'NZL', 18, 'Kosta Barbarouses',        false)
on conflict do nothing;

-- ESP - Espanha
insert into stickers (id, team_id, number, player_name, is_special) values
  ('ESP-0',  'ESP', 0,  'Escudo Espanha',          true),
  ('ESP-1',  'ESP', 1,  'Unai Simón',               false),
  ('ESP-2',  'ESP', 2,  'Robin Le Normand',         false),
  ('ESP-3',  'ESP', 3,  'Aymeric Laporte',          false),
  ('ESP-4',  'ESP', 4,  'Dean Huijsen',             false),
  ('ESP-5',  'ESP', 5,  'Pedro Porro',              false),
  ('ESP-6',  'ESP', 6,  'Dani Carvajal',            false),
  ('ESP-7',  'ESP', 7,  'Marc Cucurella',           false),
  ('ESP-8',  'ESP', 8,  'Martín Zubimendi',         false),
  ('ESP-9',  'ESP', 9,  'Rodri',                    false),
  ('ESP-10', 'ESP', 10, 'Pedri',                    false),
  ('ESP-11', 'ESP', 11, 'Fabián Ruiz',              false),
  ('ESP-12', 'ESP', 12, 'Mikel Merino',             false),
  ('ESP-13', 'ESP', 13, 'Lamine Yamal',             false),
  ('ESP-14', 'ESP', 14, 'Dani Olmo',                false),
  ('ESP-15', 'ESP', 15, 'Nico Williams',            false),
  ('ESP-16', 'ESP', 16, 'Ferran Torres',            false),
  ('ESP-17', 'ESP', 17, 'Álvaro Morata',            false),
  ('ESP-18', 'ESP', 18, 'Mikel Oyarzabal',          false)
on conflict do nothing;

-- CPV - Cabo Verde
insert into stickers (id, team_id, number, player_name, is_special) values
  ('CPV-0',  'CPV', 0,  'Escudo Cabo Verde',       true),
  ('CPV-1',  'CPV', 1,  'Vozinha',                  false),
  ('CPV-2',  'CPV', 2,  'Logan Costa',             false),
  ('CPV-3',  'CPV', 3,  'Pico',                    false),
  ('CPV-4',  'CPV', 4,  'Diney',                   false),
  ('CPV-5',  'CPV', 5,  'Steven Moreira',          false),
  ('CPV-6',  'CPV', 6,  'Wagner Pina',             false),
  ('CPV-7',  'CPV', 7,  'João Paulo',              false),
  ('CPV-8',  'CPV', 8,  'Yannick Semedo',          false),
  ('CPV-9',  'CPV', 9,  'Kevin Pina',              false),
  ('CPV-10', 'CPV', 10, 'Patrick Andrade',         false),
  ('CPV-11', 'CPV', 11, 'Jamiro Monteiro',         false),
  ('CPV-12', 'CPV', 12, 'Deroy Duarte',            false),
  ('CPV-13', 'CPV', 13, 'Garry Rodrigues',         false),
  ('CPV-14', 'CPV', 14, 'Jovane Cabral',           false),
  ('CPV-15', 'CPV', 15, 'Ryan Mendes',             false),
  ('CPV-16', 'CPV', 16, 'Dailon Livramento',       false),
  ('CPV-17', 'CPV', 17, 'Willy Semedo',            false),
  ('CPV-18', 'CPV', 18, 'Bebé',                    false)
on conflict do nothing;

-- KSA - Arábia Saudita
insert into stickers (id, team_id, number, player_name, is_special) values
  ('KSA-0',  'KSA', 0,  'Escudo Arábia Saudita',  true),
  ('KSA-1',  'KSA', 1,  'Nawaf Alaqidi',           false),
  ('KSA-2',  'KSA', 2,  'Abdulrahman Al-Sanbi',    false),
  ('KSA-3',  'KSA', 3,  'Saud Abdulhamid',         false),
  ('KSA-4',  'KSA', 4,  'Nawaf Boushal',           false),
  ('KSA-5',  'KSA', 5,  'Jihad Thakri',            false),
  ('KSA-6',  'KSA', 6,  'Moteb Al-Harbi',          false),
  ('KSA-7',  'KSA', 7,  'Hassan Altambakti',       false),
  ('KSA-8',  'KSA', 8,  'Musab Aljuwayr',          false),
  ('KSA-9',  'KSA', 9,  'Ziyad Aljohani',          false),
  ('KSA-10', 'KSA', 10, 'Abdullah Alkhaibari',     false),
  ('KSA-11', 'KSA', 11, 'Nasser Aldawsari',        false),
  ('KSA-12', 'KSA', 12, 'Saleh Abu Alshamat',      false),
  ('KSA-13', 'KSA', 13, 'Marwan Alsahafi',         false),
  ('KSA-14', 'KSA', 14, 'Salem Aldawsari',         false),
  ('KSA-15', 'KSA', 15, 'Abdulrahman Al-Aboud',    false),
  ('KSA-16', 'KSA', 16, 'Feras Albrikan',          false),
  ('KSA-17', 'KSA', 17, 'Saleh Alshehri',          false),
  ('KSA-18', 'KSA', 18, 'Abdullah Al-Hamdan',      false)
on conflict do nothing;

-- URY - Uruguai
insert into stickers (id, team_id, number, player_name, is_special) values
  ('URY-0',  'URY', 0,  'Escudo Uruguai',          true),
  ('URY-1',  'URY', 1,  'Sergio Rochet',            false),
  ('URY-2',  'URY', 2,  'Santiago Mele',            false),
  ('URY-3',  'URY', 3,  'Ronald Araujo',            false),
  ('URY-4',  'URY', 4,  'José María Giménez',       false),
  ('URY-5',  'URY', 5,  'Sebastian Caceres',        false),
  ('URY-6',  'URY', 6,  'Mathias Olivera',          false),
  ('URY-7',  'URY', 7,  'Guillermo Varela',         false),
  ('URY-8',  'URY', 8,  'Nahitan Nandez',           false),
  ('URY-9',  'URY', 9,  'Federico Valverde',        false),
  ('URY-10', 'URY', 10, 'Giorgian De Arrascaeta',   false),
  ('URY-11', 'URY', 11, 'Rodrigo Bentancur',        false),
  ('URY-12', 'URY', 12, 'Manuel Ugarte',            false),
  ('URY-13', 'URY', 13, 'Nicolás de la Cruz',       false),
  ('URY-14', 'URY', 14, 'Maxi Araujo',              false),
  ('URY-15', 'URY', 15, 'Darwin Núñez',             false),
  ('URY-16', 'URY', 16, 'Federico Viñas',           false),
  ('URY-17', 'URY', 17, 'Rodrigo Aguirre',          false),
  ('URY-18', 'URY', 18, 'Facundo Pellistri',        false)
on conflict do nothing;

-- FRA - França
insert into stickers (id, team_id, number, player_name, is_special) values
  ('FRA-0',  'FRA', 0,  'Escudo França',           true),
  ('FRA-1',  'FRA', 1,  'Mike Maignan',             false),
  ('FRA-2',  'FRA', 2,  'Theo Hernández',           false),
  ('FRA-3',  'FRA', 3,  'William Saliba',           false),
  ('FRA-4',  'FRA', 4,  'Jules Koundé',             false),
  ('FRA-5',  'FRA', 5,  'Ibrahima Konaté',          false),
  ('FRA-6',  'FRA', 6,  'Dayot Upamecano',          false),
  ('FRA-7',  'FRA', 7,  'Lucas Digne',              false),
  ('FRA-8',  'FRA', 8,  'Aurélien Tchouaméni',      false),
  ('FRA-9',  'FRA', 9,  'Eduardo Camavinga',        false),
  ('FRA-10', 'FRA', 10, 'Manu Koné',               false),
  ('FRA-11', 'FRA', 11, 'Adrien Rabiot',            false),
  ('FRA-12', 'FRA', 12, 'Michael Olise',            false),
  ('FRA-13', 'FRA', 13, 'Ousmane Dembélé',          false),
  ('FRA-14', 'FRA', 14, 'Bradley Barcola',          false),
  ('FRA-15', 'FRA', 15, 'Désiré Doué',              false),
  ('FRA-16', 'FRA', 16, 'Kingsley Coman',           false),
  ('FRA-17', 'FRA', 17, 'Hugo Ekitike',             false),
  ('FRA-18', 'FRA', 18, 'Kylian Mbappé',            false)
on conflict do nothing;

-- SEN - Senegal
insert into stickers (id, team_id, number, player_name, is_special) values
  ('SEN-0',  'SEN', 0,  'Escudo Senegal',           true),
  ('SEN-1',  'SEN', 1,  'Eduardo Mendy',             false),
  ('SEN-2',  'SEN', 2,  'Yehvann Diouf',             false),
  ('SEN-3',  'SEN', 3,  'Moussa Niakhaté',           false),
  ('SEN-4',  'SEN', 4,  'Abdoulaye Seck',            false),
  ('SEN-5',  'SEN', 5,  'Ismail Jakobs',             false),
  ('SEN-6',  'SEN', 6,  'El Hadji Malick Diouf',     false),
  ('SEN-7',  'SEN', 7,  'Kalidou Koulibaly',         false),
  ('SEN-8',  'SEN', 8,  'Idrissa Gana Gueye',        false),
  ('SEN-9',  'SEN', 9,  'Pape Matar Sarr',           false),
  ('SEN-10', 'SEN', 10, 'Pape Gueye',                false),
  ('SEN-11', 'SEN', 11, 'Habib Diarra',              false),
  ('SEN-12', 'SEN', 12, 'Lamine Camara',             false),
  ('SEN-13', 'SEN', 13, 'Sadio Mane',                false),
  ('SEN-14', 'SEN', 14, 'Ismaïla Sarr',              false),
  ('SEN-15', 'SEN', 15, 'Boulaye Dia',               false),
  ('SEN-16', 'SEN', 16, 'Iliman Ndiaye',             false),
  ('SEN-17', 'SEN', 17, 'Nicolas Jackson',           false),
  ('SEN-18', 'SEN', 18, 'Krepin Diatta',             false)
on conflict do nothing;

-- IRQ - Iraque
insert into stickers (id, team_id, number, player_name, is_special) values
  ('IRQ-0',  'IRQ', 0,  'Escudo Iraque',            true),
  ('IRQ-1',  'IRQ', 1,  'Jalal Hassan',              false),
  ('IRQ-2',  'IRQ', 2,  'Rebin Sulaka',              false),
  ('IRQ-3',  'IRQ', 3,  'Hussein Ali',               false),
  ('IRQ-4',  'IRQ', 4,  'Akam Hashem',               false),
  ('IRQ-5',  'IRQ', 5,  'Merchas Doski',             false),
  ('IRQ-6',  'IRQ', 6,  'Zaid Tahseen',              false),
  ('IRQ-7',  'IRQ', 7,  'Manaf Younis',              false),
  ('IRQ-8',  'IRQ', 8,  'Zidane Iqbal',              false),
  ('IRQ-9',  'IRQ', 9,  'Amir Al-Ammari',            false),
  ('IRQ-10', 'IRQ', 10, 'Ibrahim Bayesh',            false),
  ('IRQ-11', 'IRQ', 11, 'Ali Jasim',                 false),
  ('IRQ-12', 'IRQ', 12, 'Youssef Amyn',              false),
  ('IRQ-13', 'IRQ', 13, 'Aimar Sher',                false),
  ('IRQ-14', 'IRQ', 14, 'Marko Farji',               false),
  ('IRQ-15', 'IRQ', 15, 'Osama Rashid',              false),
  ('IRQ-16', 'IRQ', 16, 'Ali Al-Hamadi',             false),
  ('IRQ-17', 'IRQ', 17, 'Aymen Hussein',             false),
  ('IRQ-18', 'IRQ', 18, 'Mohanad Ali',               false)
on conflict do nothing;

-- NOR - Noruega
insert into stickers (id, team_id, number, player_name, is_special) values
  ('NOR-0',  'NOR', 0,  'Escudo Noruega',           true),
  ('NOR-1',  'NOR', 1,  'Ørjan Nyland',              false),
  ('NOR-2',  'NOR', 2,  'Julian Ryerson',            false),
  ('NOR-3',  'NOR', 3,  'Leo Østigård',              false),
  ('NOR-4',  'NOR', 4,  'Kristoffer Ajer',           false),
  ('NOR-5',  'NOR', 5,  'Marcus Holmgren Pedersen',  false),
  ('NOR-6',  'NOR', 6,  'David Møller Wolfe',        false),
  ('NOR-7',  'NOR', 7,  'Torbjørn Heggem',           false),
  ('NOR-8',  'NOR', 8,  'Morten Thorsby',            false),
  ('NOR-9',  'NOR', 9,  'Martin Ødegaard',           false),
  ('NOR-10', 'NOR', 10, 'Sander Berge',              false),
  ('NOR-11', 'NOR', 11, 'Andreas Schjelderup',       false),
  ('NOR-12', 'NOR', 12, 'Patrick Berg',              false),
  ('NOR-13', 'NOR', 13, 'Erling Haaland',            false),
  ('NOR-14', 'NOR', 14, 'Alexander Sørloth',         false),
  ('NOR-15', 'NOR', 15, 'Aron Dønnum',              false),
  ('NOR-16', 'NOR', 16, 'Jørgen Strand Larsen',      false),
  ('NOR-17', 'NOR', 17, 'Antonio Nusa',              false),
  ('NOR-18', 'NOR', 18, 'Oscar Bobb',                false)
on conflict do nothing;

-- ARG - Argentina
insert into stickers (id, team_id, number, player_name, is_special) values
  ('ARG-0',  'ARG', 0,  'Escudo Argentina',        true),
  ('ARG-1',  'ARG', 1,  'Emiliano Martínez',        false),
  ('ARG-2',  'ARG', 2,  'Nahuel Molina',            false),
  ('ARG-3',  'ARG', 3,  'Cristian Romero',          false),
  ('ARG-4',  'ARG', 4,  'Nicolás Otamendi',         false),
  ('ARG-5',  'ARG', 5,  'Nicolás Tagliafico',       false),
  ('ARG-6',  'ARG', 6,  'Leonardo Balerdi',         false),
  ('ARG-7',  'ARG', 7,  'Enzo Fernández',           false),
  ('ARG-8',  'ARG', 8,  'Alexis Mac Allister',      false),
  ('ARG-9',  'ARG', 9,  'Rodrigo De Paul',          false),
  ('ARG-10', 'ARG', 10, 'Exequiel Palacios',        false),
  ('ARG-11', 'ARG', 11, 'Leandro Paredes',          false),
  ('ARG-12', 'ARG', 12, 'Nico Paz',                 false),
  ('ARG-13', 'ARG', 13, 'Franco Mastantuono',       false),
  ('ARG-14', 'ARG', 14, 'Nico González',            false),
  ('ARG-15', 'ARG', 15, 'Lionel Messi',             false),
  ('ARG-16', 'ARG', 16, 'Lautaro Martínez',         false),
  ('ARG-17', 'ARG', 17, 'Julián Álvarez',           false),
  ('ARG-18', 'ARG', 18, 'Giuliano Simeone',         false)
on conflict do nothing;

-- ALG - Argélia
insert into stickers (id, team_id, number, player_name, is_special) values
  ('ALG-0',  'ALG', 0,  'Escudo Argélia',           true),
  ('ALG-1',  'ALG', 1,  'Alexis Guendouz',           false),
  ('ALG-2',  'ALG', 2,  'Ramy Bensebaini',           false),
  ('ALG-3',  'ALG', 3,  'Youcef Atal',               false),
  ('ALG-4',  'ALG', 4,  'Rayan Aït-Nouri',           false),
  ('ALG-5',  'ALG', 5,  'Mohamed Amine Tougai',      false),
  ('ALG-6',  'ALG', 6,  'Aïssa Mandi',               false),
  ('ALG-7',  'ALG', 7,  'Ismael Bennacer',           false),
  ('ALG-8',  'ALG', 8,  'Houssem Aouar',             false),
  ('ALG-9',  'ALG', 9,  'Hicham Boudaoui',           false),
  ('ALG-10', 'ALG', 10, 'Ramiz Zerrouki',            false),
  ('ALG-11', 'ALG', 11, 'Nabil Bentaleb',            false),
  ('ALG-12', 'ALG', 12, 'Farès Chaibi',              false),
  ('ALG-13', 'ALG', 13, 'Riyad Mahrez',              false),
  ('ALG-14', 'ALG', 14, 'Said Benrahma',             false),
  ('ALG-15', 'ALG', 15, 'Anis Hadj Moussa',          false),
  ('ALG-16', 'ALG', 16, 'Amine Gouiri',              false),
  ('ALG-17', 'ALG', 17, 'Baghdad Bounedjah',         false),
  ('ALG-18', 'ALG', 18, 'Mohammed Amoura',           false)
on conflict do nothing;

-- AUT - Áustria
insert into stickers (id, team_id, number, player_name, is_special) values
  ('AUT-0',  'AUT', 0,  'Escudo Áustria',           true),
  ('AUT-1',  'AUT', 1,  'Alexander Schlager',        false),
  ('AUT-2',  'AUT', 2,  'Patrick Pentz',             false),
  ('AUT-3',  'AUT', 3,  'David Alaba',               false),
  ('AUT-4',  'AUT', 4,  'Kevin Danso',               false),
  ('AUT-5',  'AUT', 5,  'Philipp Lienhart',          false),
  ('AUT-6',  'AUT', 6,  'Stefan Posch',              false),
  ('AUT-7',  'AUT', 7,  'Phillipp Mwene',            false),
  ('AUT-8',  'AUT', 8,  'Alexander Prass',           false),
  ('AUT-9',  'AUT', 9,  'Xaver Schlager',            false),
  ('AUT-10', 'AUT', 10, 'Marcel Sabitzer',           false),
  ('AUT-11', 'AUT', 11, 'Konrad Laimer',             false),
  ('AUT-12', 'AUT', 12, 'Florian Grillitsch',        false),
  ('AUT-13', 'AUT', 13, 'Nicolas Seiwald',           false),
  ('AUT-14', 'AUT', 14, 'Romano Schmid',             false),
  ('AUT-15', 'AUT', 15, 'Patrick Wimmer',            false),
  ('AUT-16', 'AUT', 16, 'Christoph Baumgartner',     false),
  ('AUT-17', 'AUT', 17, 'Michael Gregoritsch',       false),
  ('AUT-18', 'AUT', 18, 'Marko Arnautović',          false)
on conflict do nothing;

-- JOR - Jordânia
insert into stickers (id, team_id, number, player_name, is_special) values
  ('JOR-0',  'JOR', 0,  'Escudo Jordânia',          true),
  ('JOR-1',  'JOR', 1,  'Yazeed Abulaila',           false),
  ('JOR-2',  'JOR', 2,  'Ihsan Haddad',              false),
  ('JOR-3',  'JOR', 3,  'Mohammad Abu Hashish',      false),
  ('JOR-4',  'JOR', 4,  'Yazan Al-Arab',             false),
  ('JOR-5',  'JOR', 5,  'Abdallah Nasib',            false),
  ('JOR-6',  'JOR', 6,  'Saleem Obaid',              false),
  ('JOR-7',  'JOR', 7,  'Mohammad Abualnadi',        false),
  ('JOR-8',  'JOR', 8,  'Ibrahim Saadeh',            false),
  ('JOR-9',  'JOR', 9,  'Nizar Al-Rashdan',          false),
  ('JOR-10', 'JOR', 10, 'Noor Al-Rawabdeh',          false),
  ('JOR-11', 'JOR', 11, 'Mohannad Abu Taha',         false),
  ('JOR-12', 'JOR', 12, 'Amer Jamous',               false),
  ('JOR-13', 'JOR', 13, 'Musa Al-Taamari',           false),
  ('JOR-14', 'JOR', 14, 'Yazan Al-Naimat',           false),
  ('JOR-15', 'JOR', 15, 'Mahmoud Al-Mardi',          false),
  ('JOR-16', 'JOR', 16, 'Ali Olwan',                 false),
  ('JOR-17', 'JOR', 17, 'Mohammad Abu Zrayq',        false),
  ('JOR-18', 'JOR', 18, 'Ibrahim Sabra',             false)
on conflict do nothing;

-- POR - Portugal
insert into stickers (id, team_id, number, player_name, is_special) values
  ('POR-0',  'POR', 0,  'Escudo Portugal',          true),
  ('POR-1',  'POR', 1,  'Diogo Costa',              false),
  ('POR-2',  'POR', 2,  'Jose Sa',                  false),
  ('POR-3',  'POR', 3,  'Ruben Dias',               false),
  ('POR-4',  'POR', 4,  'João Cancelo',             false),
  ('POR-5',  'POR', 5,  'Diogo Dalot',              false),
  ('POR-6',  'POR', 6,  'Nuno Mendes',              false),
  ('POR-7',  'POR', 7,  'Gonçalo Inácio',           false),
  ('POR-8',  'POR', 8,  'Bernardo Silva',           false),
  ('POR-9',  'POR', 9,  'Bruno Fernandes',          false),
  ('POR-10', 'POR', 10, 'Ruben Neves',              false),
  ('POR-11', 'POR', 11, 'Vitinha',                  false),
  ('POR-12', 'POR', 12, 'João Neves',               false),
  ('POR-13', 'POR', 13, 'Cristiano Ronaldo',        false),
  ('POR-14', 'POR', 14, 'Francisco Trincão',        false),
  ('POR-15', 'POR', 15, 'João Felix',               false),
  ('POR-16', 'POR', 16, 'Gonçalo Ramos',            false),
  ('POR-17', 'POR', 17, 'Pedro Neto',               false),
  ('POR-18', 'POR', 18, 'Rafael Leão',              false)
on conflict do nothing;

-- COD - Rep. Democrática do Congo
insert into stickers (id, team_id, number, player_name, is_special) values
  ('COD-0',  'COD', 0,  'Escudo R.D. Congo',        true),
  ('COD-1',  'COD', 1,  'Lionel Mpasi',              false),
  ('COD-2',  'COD', 2,  'Aaron Wan-Bissaka',         false),
  ('COD-3',  'COD', 3,  'Axel Tuanzebe',             false),
  ('COD-4',  'COD', 4,  'Arthur Masuaku',            false),
  ('COD-5',  'COD', 5,  'Chancel Mbemba',            false),
  ('COD-6',  'COD', 6,  'Joris Kayembe',             false),
  ('COD-7',  'COD', 7,  'Charles Pickel',            false),
  ('COD-8',  'COD', 8,  'Ngal''ayel Mukau',           false),
  ('COD-9',  'COD', 9,  'Edo Kayembe',               false),
  ('COD-10', 'COD', 10, 'Samuel Moutoussamy',        false),
  ('COD-11', 'COD', 11, 'Noah Sadiki',               false),
  ('COD-12', 'COD', 12, 'Théo Bongonda',             false),
  ('COD-13', 'COD', 13, 'Meschack Elia',             false),
  ('COD-14', 'COD', 14, 'Yoane Wissa',               false),
  ('COD-15', 'COD', 15, 'Brian Cipenga',             false),
  ('COD-16', 'COD', 16, 'Fiston Mayele',             false),
  ('COD-17', 'COD', 17, 'Cédric Bakambu',            false),
  ('COD-18', 'COD', 18, 'Nathanaël Mbuku',           false)
on conflict do nothing;

-- UZB - Uzbequistão
insert into stickers (id, team_id, number, player_name, is_special) values
  ('UZB-0',  'UZB', 0,  'Escudo Uzbequistão',       true),
  ('UZB-1',  'UZB', 1,  'Utkir Yusupov',             false),
  ('UZB-2',  'UZB', 2,  'Farrukh Savfiev',           false),
  ('UZB-3',  'UZB', 3,  'Sherzod Nasrullaev',        false),
  ('UZB-4',  'UZB', 4,  'Umar Eshmurodov',           false),
  ('UZB-5',  'UZB', 5,  'Husniddin Aliqulov',        false),
  ('UZB-6',  'UZB', 6,  'Rustamjon Ashurmatov',      false),
  ('UZB-7',  'UZB', 7,  'Khojiakbar Alijonov',       false),
  ('UZB-8',  'UZB', 8,  'Abdukodir Khusanov',        false),
  ('UZB-9',  'UZB', 9,  'Odiljon Hamrobekov',        false),
  ('UZB-10', 'UZB', 10, 'Otabek Shukurov',           false),
  ('UZB-11', 'UZB', 11, 'Jamshid Iskanderov',        false),
  ('UZB-12', 'UZB', 12, 'Azizbek Turgunboev',        false),
  ('UZB-13', 'UZB', 13, 'Khojimat Erkinov',          false),
  ('UZB-14', 'UZB', 14, 'Eldor Shomurodov',          false),
  ('UZB-15', 'UZB', 15, 'Oston Urunov',              false),
  ('UZB-16', 'UZB', 16, 'Jaloliddin Masharipov',     false),
  ('UZB-17', 'UZB', 17, 'Igor Sergeev',              false),
  ('UZB-18', 'UZB', 18, 'Abbosbek Fayzullaev',       false)
on conflict do nothing;

-- COL - Colômbia
insert into stickers (id, team_id, number, player_name, is_special) values
  ('COL-0',  'COL', 0,  'Escudo Colômbia',          true),
  ('COL-1',  'COL', 1,  'Camilo Vargas',             false),
  ('COL-2',  'COL', 2,  'David Ospina',              false),
  ('COL-3',  'COL', 3,  'Dávinson Sánchez',          false),
  ('COL-4',  'COL', 4,  'Yerry Mina',                false),
  ('COL-5',  'COL', 5,  'Daniel Muñoz',              false),
  ('COL-6',  'COL', 6,  'Johan Mojica',              false),
  ('COL-7',  'COL', 7,  'Jhon Lucumí',              false),
  ('COL-8',  'COL', 8,  'Santiago Arias',            false),
  ('COL-9',  'COL', 9,  'Jefferson Lerma',           false),
  ('COL-10', 'COL', 10, 'Kevin Castaño',             false),
  ('COL-11', 'COL', 11, 'Richard Ríos',              false),
  ('COL-12', 'COL', 12, 'James Rodríguez',           false),
  ('COL-13', 'COL', 13, 'Juan Fernando Quintero',    false),
  ('COL-14', 'COL', 14, 'Jorge Carrascal',           false),
  ('COL-15', 'COL', 15, 'Jhon Arias',                false),
  ('COL-16', 'COL', 16, 'Jhon Córdoba',              false),
  ('COL-17', 'COL', 17, 'Luis Suárez',               false),
  ('COL-18', 'COL', 18, 'Luis Díaz',                 false)
on conflict do nothing;

-- ENG - Inglaterra
insert into stickers (id, team_id, number, player_name, is_special) values
  ('ENG-0',  'ENG', 0,  'Escudo Inglaterra',        true),
  ('ENG-1',  'ENG', 1,  'Jordan Pickford',           false),
  ('ENG-2',  'ENG', 2,  'John Stones',               false),
  ('ENG-3',  'ENG', 3,  'Marc Guéhi',                false),
  ('ENG-4',  'ENG', 4,  'Ezri Konsa',                false),
  ('ENG-5',  'ENG', 5,  'Trent Alexander-Arnold',    false),
  ('ENG-6',  'ENG', 6,  'Reece James',               false),
  ('ENG-7',  'ENG', 7,  'Dan Burn',                  false),
  ('ENG-8',  'ENG', 8,  'Jordan Henderson',          false),
  ('ENG-9',  'ENG', 9,  'Declan Rice',               false),
  ('ENG-10', 'ENG', 10, 'Jude Bellingham',           false),
  ('ENG-11', 'ENG', 11, 'Cole Palmer',               false),
  ('ENG-12', 'ENG', 12, 'Morgan Rogers',             false),
  ('ENG-13', 'ENG', 13, 'Anthony Gordon',            false),
  ('ENG-14', 'ENG', 14, 'Phil Foden',                false),
  ('ENG-15', 'ENG', 15, 'Bukayo Saka',               false),
  ('ENG-16', 'ENG', 16, 'Harry Kane',                false),
  ('ENG-17', 'ENG', 17, 'Marcus Rashford',           false),
  ('ENG-18', 'ENG', 18, 'Ollie Watkins',             false)
on conflict do nothing;

-- CRO - Croácia
insert into stickers (id, team_id, number, player_name, is_special) values
  ('CRO-0',  'CRO', 0,  'Escudo Croácia',           true),
  ('CRO-1',  'CRO', 1,  'Dominik Livaković',         false),
  ('CRO-2',  'CRO', 2,  'Duje Ćaleta-Car',           false),
  ('CRO-3',  'CRO', 3,  'Joško Gvardiol',            false),
  ('CRO-4',  'CRO', 4,  'Josip Stanišić',            false),
  ('CRO-5',  'CRO', 5,  'Luka Vušković',             false),
  ('CRO-6',  'CRO', 6,  'Josip Šutalo',              false),
  ('CRO-7',  'CRO', 7,  'Kristijan Jakić',           false),
  ('CRO-8',  'CRO', 8,  'Luka Modrić',              false),
  ('CRO-9',  'CRO', 9,  'Mateo Kovačić',             false),
  ('CRO-10', 'CRO', 10, 'Martin Baturina',           false),
  ('CRO-11', 'CRO', 11, 'Lovro Majer',               false),
  ('CRO-12', 'CRO', 12, 'Mario Pašalić',             false),
  ('CRO-13', 'CRO', 13, 'Petar Sučić',              false),
  ('CRO-14', 'CRO', 14, 'Ivan Perišić',              false),
  ('CRO-15', 'CRO', 15, 'Marco Pašalić',             false),
  ('CRO-16', 'CRO', 16, 'Ante Budimir',              false),
  ('CRO-17', 'CRO', 17, 'Andrej Kramarić',           false),
  ('CRO-18', 'CRO', 18, 'Franjo Ivanović',           false)
on conflict do nothing;

-- GHA - Gana
insert into stickers (id, team_id, number, player_name, is_special) values
  ('GHA-0',  'GHA', 0,  'Escudo Gana',               true),
  ('GHA-1',  'GHA', 1,  'Lawrence Ati Zigi',          false),
  ('GHA-2',  'GHA', 2,  'Tariq Lamptey',              false),
  ('GHA-3',  'GHA', 3,  'Mohammed Salisu',            false),
  ('GHA-4',  'GHA', 4,  'Alidu Seidu',                false),
  ('GHA-5',  'GHA', 5,  'Alexander Djiku',            false),
  ('GHA-6',  'GHA', 6,  'Gideon Mensah',              false),
  ('GHA-7',  'GHA', 7,  'Caleb Yirenkyi',             false),
  ('GHA-8',  'GHA', 8,  'Abdul Fatawu Issahaku',      false),
  ('GHA-9',  'GHA', 9,  'Thomas Partey',              false),
  ('GHA-10', 'GHA', 10, 'Salis Abdul Samed',          false),
  ('GHA-11', 'GHA', 11, 'Kamaldeen Sulemana',         false),
  ('GHA-12', 'GHA', 12, 'Mohammed Kudus',             false),
  ('GHA-13', 'GHA', 13, 'Iñaki Williams',             false),
  ('GHA-14', 'GHA', 14, 'Jordan Ayew',                false),
  ('GHA-15', 'GHA', 15, 'André Ayew',                 false),
  ('GHA-16', 'GHA', 16, 'Joseph Paintsil',            false),
  ('GHA-17', 'GHA', 17, 'Osman Bukari',               false),
  ('GHA-18', 'GHA', 18, 'Antoine Semenyo',            false)
on conflict do nothing;

-- PAN - Panamá
insert into stickers (id, team_id, number, player_name, is_special) values
  ('PAN-0',  'PAN', 0,  'Escudo Panamá',             true),
  ('PAN-1',  'PAN', 1,  'Orlando Mosquera',           false),
  ('PAN-2',  'PAN', 2,  'Luis Mejía',                 false),
  ('PAN-3',  'PAN', 3,  'Fidel Escobar',              false),
  ('PAN-4',  'PAN', 4,  'Andrés Andrade',             false),
  ('PAN-5',  'PAN', 5,  'Michael Amir Murillo',       false),
  ('PAN-6',  'PAN', 6,  'Eric Davis',                 false),
  ('PAN-7',  'PAN', 7,  'José Córdoba',               false),
  ('PAN-8',  'PAN', 8,  'César Blackman',             false),
  ('PAN-9',  'PAN', 9,  'Cristian Martínez',          false),
  ('PAN-10', 'PAN', 10, 'Aníbal Godoy',               false),
  ('PAN-11', 'PAN', 11, 'Adalberto Carrasquilla',     false),
  ('PAN-12', 'PAN', 12, 'Édgar Bárcenas',             false),
  ('PAN-13', 'PAN', 13, 'Carlos Harvey',              false),
  ('PAN-14', 'PAN', 14, 'Ismael Díaz',                false),
  ('PAN-15', 'PAN', 15, 'José Fajardo',               false),
  ('PAN-16', 'PAN', 16, 'Cecilio Waterman',           false),
  ('PAN-17', 'PAN', 17, 'José Luis Rodríguez',        false),
  ('PAN-18', 'PAN', 18, 'Alberto Quintero',           false)
on conflict do nothing;
