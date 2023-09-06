
KINGDOM COME DELIVERANCE

INSERT INTO games(game_title, game_image_big, game_image_small, game_logo, release_date, description ,about, game_url, genre_id, developer, publisher) 
VALUES ('Kingdom Come: Deliverance', 'https://store-images.s-microsoft.com/image/apps.56098.14531461635142175.79361d33-7a18-4554-8a50-66b60d3712e6.8e91b8ec-e67d-4f29-a5fb-63d41f5eb229?mode=scale&q=90&h=1080&w=1920',
'https://store-images.s-microsoft.com/image/apps.2553.14531461635142175.79361d33-7a18-4554-8a50-66b60d3712e6.80f32c14-423b-4f2c-a417-9c4e03c9c879',
'https://cdn2.steamgriddb.com/file/sgdb-cdn/logo/8b0bb3eff8c1e5bf7f206125959921d7.png', '02/13/18', 'Kingdom Come: Deliverance is a story-driven open-world RPG that immerses you in an epic adventure in the Holy Roman Empire. Avenge your parents death as you battle invading forces, go on game-changing quests, and make influential choices.',
'Thrust into a raging civil war, you watch helplessly as invaders storm your village and slaughter your family. Narrowly escaping the brutal attack, you grab your sword to fight back. Avenge the death of your parents and help repel the invading forces!

Majestic castles, vast fields, all rendered in stunning high-end graphics.

Solve quests in multiple ways, then face the consequences of your decisions.

Distance, stealth, or melee. Choose your weapons and execute dozens of unique combos in battles that are as thrilling as they are merciless.

Improve your skills, earn new perks, and forge and upgrade your equipment.

Your actions influence the reactions of the people around you. Fight, steal, seduce, threaten, persuade, or bribe. It is all up to you.

Meet real historical characters and experience the genuine look and feel of medieval Bohemia.', '/kingdomcome', 3, 'Warhorse Studios', 'Prime Matter');

YAKUZA 0

INSERT INTO games(game_title, game_image_big, game_image_small, game_logo, release_date, description ,about, game_url, genre_id, developer, publisher) 
VALUES ('Yakuza 0', 'http://localhost:3000/static/media/yakuza.e9214f811bd7acbd11a4.jpg',
'https://store-images.s-microsoft.com/image/apps.39148.14163943905070744.0448a0ad-df57-4343-bd68-4383f0e00abd.c900e907-f923-4304-9ab6-012943740bd6',
'https://yakuza.sega.com/yakuza0/img/top/logo-yakuza0.png', '03/12/15', 'SEGAs legendary Japanese series finally comes to PC. Fight like hell through Tokyo and Osaka as junior yakuza Kiryu and Majima. Take a front row seat to 1980s life in Japan in an experience unlike anything else in video gaming, with uncapped framerates and 4K resolutions. A legend is born.',
'The glitz, glamour, and unbridled decadence of the 80s are back in Yakuza 0.

Fight like hell through Tokyo and Osaka with protagonist Kazuma Kiryu and series regular Goro Majima. Play as Kazuma Kiryu and discover how he finds himself in a world of trouble when a simple debt collection goes wrong and his mark winds up murdered. Then, step into the silver-toed shoes of Goro Majima and explore his “normal” life as the proprietor of a cabaret club.

Switch between three different fighting styles instantaneously and beat up all manner of goons, thugs, hoodlums, and lowlifes. Take combat up a notch by using environmental objects such as bicycles, sign posts, and car doors for bone-crunching combos and savage take-downs.

Fighting is not the only way to kill time in 1988s Japan: from discos and hostess clubs to classic SEGA arcades, there are tons of distractions to pursue in the richly detailed, neon-lit world.

Interact with the colourful denizens the red light district: help a budding S&M dominatrix learn her profession, or ensure a street performer can make it to the bathroom in time, there are 100 incredible stories to discover.', '/yakuza0', 1, 'Ryu Ga Gotoku Studio', 'SEGA');


RED DEAD REDEMPTION 2

INSERT INTO games(game_title, game_image_big, game_image_small, game_logo, release_date, description ,about, game_url, genre_id, developer, publisher) 
VALUES ('Red Dead Redemption 2', 'https://images.ctfassets.net/wn7ipiv9ue5v/5JANuwUn7LTdXshdfMUIFD/98a046c496b39c89879b71b70e37c419/RDR_Hero_FPO.jpg',
'https://www.teahub.io/photos/full/97-975921_iphone-red-dead-redemption-2.jpg',
'https://upload.wikimedia.org/wikipedia/commons/2/22/Red_Dead_Redemption_2_Logo.png', '11/05/19', 'Winner of over 175 Game of the Year Awards and recipient of over 250 perfect scores, RDR2 is the epic tale of outlaw Arthur Morgan and the infamous Van der Linde gang, on the run across America at the dawn of the modern age. Also includes access to the shared living world of Red Dead Online.',
'America, 1899.

Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive. As deepening internal divisions threaten to tear the gang apart, Arthur must make a choice between his own ideals and loyalty to the gang who raised him.

Now featuring additional Story Mode content and a fully-featured Photo Mode, Red Dead Redemption 2 also includes free access to the shared living world of Red Dead Online, where players take on an array of roles to carve their own unique path on the frontier as they track wanted criminals as a Bounty Hunter, create a business as a Trader, unearth exotic treasures as a Collector or run an underground distillery as a Moonshiner and much more.

With all new graphical and technical enhancements for deeper immersion, Red Dead Redemption 2 for PC takes full advantage of the power of the PC to bring every corner of this massive, rich and detailed world to life including increased draw distances; higher quality global illumination and ambient occlusion for improved day and night lighting; improved reflections and deeper, higher resolution shadows at all distances; tessellated tree textures and improved grass and fur textures for added realism in every plant and animal.

Red Dead Redemption 2 for PC also offers HDR support, the ability to run high-end display setups with 4K resolution and beyond, multi-monitor configurations, widescreen configurations, faster frame rates and more.', '/rdr2', 2, 'Rockstar Games', 'Rockstar Games');


FOR GENRES

INSERT into genres(genre_title) VALUES ('Action');
INSERT into genres(genre_title) VALUES ('Adventure & Casual');
INSERT into genres(genre_title) VALUES ('Role-Playing');
INSERT into genres(genre_title) VALUES ('Simulation');
INSERT into genres(genre_title) VALUES ('Strategy');
INSERT into genres(genre_title) VALUES ('Sports & Racing');



how to select specific game stuff;

select genre_title from genres INNER JOIN games on genres.genre_id = games.genre_id where games.game_id = 1;
select * from games INNER JOIN genres on  games.genre_id = genres.genre_id where genres.genre_id = 3;