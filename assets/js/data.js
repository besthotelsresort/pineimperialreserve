/* ============================================================
   MapleLeaf Retreats — site data
   Editing this file updates cards, review headers, maps,
   reviews grids and author pages across the whole site.
   Consumed by the shared engine in assets/js/site.js.
   ============================================================ */

const SITE = {
  brand: "MapleLeaf Retreats",
  brandMark: "MapleLeaf",
  brandSuffix: "Retreats",
  glyph: "🍁",
  tagline: "Handpicked Canadian retreats where you can genuinely switch off",
  established: 2013,
  email: "tom.mercier.133@gmail.com",
  domain: "pineimperialreserve.onrender.com",
  phone: "+1 (604) 555-0147",
  city: "Vancouver, British Columbia",
  intro: "A small team of Canadian travel writers, quietly checking into the country's most restful stays — lakeside châteaux, a harbourfront icon, and a couple of lively resort escapes — so you always know before you go."
};

const AUTHORS = {
  "rosalind-thibault": {
    name: "Rosalind Thibault",
    slug: "rosalind-thibault",
    role: "Editor-at-Large",
    since: 2013,
    location: "Québec City, QC",
    bio: "Rosalind founded MapleLeaf Retreats at her kitchen table in 2013, after two decades cataloguing heritage buildings for a provincial archive taught her that a great hotel is really a great story you get to sleep inside. She grew up in a draughty inn on the Gaspé coast that her grandparents ran, learned to read a room's history from its floorboards, and now spends her winters chasing the low golden light through railway châteaux and lakeside grand hotels. She is the person who will notice the year a staircase was rebuilt, argue with a sommelier about terroir, and still tell you plainly whether the radiator actually works. Every heritage and lakeside review on this site passes across her desk.",
    focus: "Heritage & lakeside hotels, architecture, regional dining"
  },
  "malik-osei": {
    name: "Malik Osei",
    slug: "malik-osei",
    role: "Resorts & Entertainment Writer",
    since: 2015,
    location: "Windsor, ON",
    bio: "Malik reviews the loud places for the readers who want the buzz and the readers who want to escape it — often the same person on the same weekend. A former sound engineer who spent years on touring crews, he can tell you where a 5,000-seat room will sound its best and which suite is far enough from the gaming floor to actually sleep. He times the check-in queues, tests every lift, orders the buffet on its worst-looking night, and has a soft spot for a well-poured drink and a headliner who earns the standing ovation. Windsor born and raised, he has probably reviewed the resort nearest you.",
    focus: "Resort casinos, live entertainment, waterfront resorts"
  },
  "nora-beaumont": {
    name: "Nora Beaumont",
    slug: "nora-beaumont",
    role: "Wellness & Slow-Travel Writer",
    since: 2017,
    location: "Victoria, BC",
    bio: "Nora writes for the traveller who measures a trip by how well they slept and how slowly they breathed. A former yoga-retreat manager turned journalist, she treats a spa treatment like a test drive and a quiet morning by the water like the main event. She'll tell you whether the pool is genuinely warm, whether the walls are thin, and whether 'wellness' is a real programme or just a scented candle in the lobby. Based on Vancouver Island, she is happiest reviewing the kind of place where the loudest sound is a kettle coming to the boil.",
    focus: "Spas, wellness, quiet escapes, slow travel"
  }
};

const HOTELS = {
  "lake-louise": {
    name: "Fairmont Chateau Lake Louise",
    slug: "lake-louise",
    city: "Lake Louise", province: "Alberta",
    stars: 5, guestRating: 4.3, reviewCount: 10700, casino: false,
    address: "111 Lake Louise Drive, Lake Louise, AB T0L 1E0, Canada", phone: "+1 403-522-3511",
    lat: 51.41778, lng: -116.21722,
    img: "assets/img/lake-louise.jpg",
    author: "rosalind-thibault",
    tags: ["Lakefront", "Banff National Park", "Ski & Hike"],
    short: "A grand lakeside château that opens straight onto turquoise water and glacier peaks — canoe from the doorstep in summer, ski from it in winter, and take afternoon tea in between.",
    amenities: ["Lakefront setting with canoeing", "Basin Glacial Waters spa & indoor pool", "Multiple restaurants & afternoon tea", "Fairmont Gold floor & lounge", "Guided hikes & snowshoeing", "Ice skating & sleigh rides", "On-site ski access in winter", "Fitness centre & boutiques"],
    reviews: [
      { name: "Kathy", rating: 5, date: "Jul 2026", text: "An impeccable hotel in a fabulous location; luxurious rooms, excellent staff, and wonderful lakeside hiking." },
      { name: "Martina", rating: 5, date: "Jul 2026", text: "Loved the historic building sitting right on the lake, and the 5 o'clock afternoon tea is a must-do." },
      { name: "BlueRidgeGal", rating: 5, date: "Jul 2026", text: "The Fairmont Gold concierge team secured reservations and transport for us; the upgrade was worth it." },
      { name: "UpgradeMe", rating: 4, date: "Jul 2026", text: "Stunning views and comfortable rooms, but service at one restaurant was slow and the bathroom design is awkward." },
      { name: "Jenny", rating: 4, date: "Jul 2026", text: "Gold rooms don't have lake views, but the beds were comfortable and breakfast was good." },
      { name: "C. C.", rating: 4, date: "Mar 2026", text: "The new Basin spa is lovely, though on-site extras can add up quickly." },
      { name: "Seema", rating: 3, date: "Jul 2026", text: "Hard to justify the rate: understaffed restaurants and a few housekeeping misses, in an extraordinary location." },
      { name: "gobrowns", rating: 2, date: "Jul 2026", text: "An ordinary hotel in an extraordinary location, with a tiny gym and an unresponsive concierge on our visit." },
      { name: "Brandie", rating: 1, date: "Jul 2026", text: "Disappointing upkeep on our stay: peeling wallpaper and inconsistent loyalty service." },
      { name: "Daniel", rating: 5, date: "Jun 2026", text: "Woke up to the turquoise lake outside the window — unforgettable. Canoeing right from the hotel was a highlight." }
    ]
  },
  "empress": {
    name: "Fairmont Empress",
    slug: "empress",
    city: "Victoria", province: "British Columbia",
    stars: 5, guestRating: 4.5, reviewCount: 5600, casino: false,
    address: "721 Government Street, Victoria, BC V8W 1W5, Canada", phone: "+1 250-384-8111",
    lat: 48.42185, lng: -123.36797,
    img: "assets/img/empress.jpg",
    author: "nora-beaumont",
    tags: ["Inner Harbour Icon", "Afternoon Tea", "Since 1908"],
    short: "The ivy-clad grande dame of Victoria's Inner Harbour — a 1908 landmark built for slow mornings, harbour views, and a legendary afternoon tea poured beneath the chandeliers.",
    amenities: ["Signature traditional Afternoon Tea", "Q at the Empress restaurant & Q Bar", "Willow Stream Spa", "Indoor heated pool & hot tub", "Fairmont Gold floor & lounge", "Inner Harbour views", "Event & wedding spaces", "Valet parking & concierge"],
    reviews: [
      { name: "Margaret", rating: 5, date: "Jun 2025", text: "A classic five-star experience that fully lives up to its reputation; elegant, comfortable, and steeped in history." },
      { name: "David", rating: 5, date: "May 2025", text: "The staff were amazing and genuinely helpful, and the views, fireplaces and service were all exemplary." },
      { name: "Jennifer", rating: 5, date: "Sep 2024", text: "The Afternoon Tea was perfection — flaky scones, house-made jam, honey from the hotel's own beehives." },
      { name: "Thomas", rating: 5, date: "Jun 2024", text: "Perfect location right on the Inner Harbour; parking was easy and the whole property is stunning." },
      { name: "James", rating: 5, date: "Oct 2023", text: "An unforgettable stay that honours its heritage while delivering modern comforts; the spa and pool were a highlight." },
      { name: "Susan", rating: 4, date: "Apr 2025", text: "Beautiful large room with a gorgeous harbour view, though the space feels every bit its historic age." },
      { name: "Linda", rating: 4, date: "Jul 2024", text: "Loved the historic charm and friendly staff, but the bathroom was surprisingly small even in a suite." },
      { name: "Robert", rating: 3, date: "Mar 2025", text: "Good but not great for the price; a lovely building, but the room and bathroom felt a bit dated." },
      { name: "Karen", rating: 3, date: "May 2024", text: "Mixed feelings — the hotel is grand and beautiful, but service was inconsistent on our stay." },
      { name: "Michael", rating: 2, date: "Aug 2024", text: "The famous Afternoon Tea felt overpriced for what it was, with add-ons pushing the cost up." }
    ]
  },
  "caesars-windsor": {
    name: "Caesars Windsor",
    slug: "caesars-windsor",
    city: "Windsor", province: "Ontario",
    stars: 4, guestRating: 4.5, reviewCount: 15000, casino: true,
    address: "377 Riverside Drive East, Windsor, ON N9A 7H7, Canada", phone: "+1 519-258-7878",
    lat: 42.320375, lng: -83.033764,
    img: "assets/img/caesars-windsor.jpg",
    author: "malik-osei",
    tags: ["Casino Resort", "Riverfront", "The Colosseum"],
    short: "A riverfront resort with the Detroit skyline out the window, a headline-act arena downstairs, and a room count big enough to swallow a convention — the switch-off is choosing when to join the buzz.",
    amenities: ["100,000 sq ft casino & 24/7 poker room", "The Colosseum — 5,000-seat venue", "Indoor pool, whirlpool & sauna", "Full-service spa & fitness centre", "Nero's Steakhouse & 6+ dining venues", "Detroit skyline river views", "Nightclub & lounges", "Convention centre & parking"],
    reviews: [
      { name: "Sliphorn", rating: 5, date: "Sep 2025", text: "Third time here and it never disappoints. Rooms are clean, staff friendly, and the view of Detroit across the river is wonderful." },
      { name: "Climber6722", rating: 5, date: "Mar 2026", text: "Fast check-in and attentive staff. Spacious suite with river views and a quiet room — just limited dresser space." },
      { name: "Gamble4life", rating: 5, date: "Dec 2025", text: "Been coming since my university days. Staff always nice and rooms always clean." },
      { name: "Sue V.", rating: 4, date: "Jul 2026", text: "Great dinner at Nero's Steakhouse and a comedy show at the Colosseum. Quiet atmosphere and the room stayed cool in the summer heat." },
      { name: "Robert P.", rating: 5, date: "Sep 2025", text: "Really a nice little vacation. The restaurants were well run and the employees were helpful." },
      { name: "Chelsea M.", rating: 4, date: "Jun 2025", text: "Here for a conference; the room was very big and clean with a great tub. The casino is huge and a bit hard to navigate." },
      { name: "Jai C.", rating: 3, date: "Jun 2026", text: "Rooms were nice for our event, but the breakfast/lunch buffet options were limited and quality felt below average." },
      { name: "issicos", rating: 2, date: "Jan 2026", text: "Check-in took over 30 minutes and a surprise fee for the pool. The custodial and concierge staff were the bright spot." },
      { name: "Kimmys639", rating: 3, date: "Jul 2025", text: "Limited housekeeping and no room service, and you can't take drinks outside your room. Waited a while for a drink." },
      { name: "Greg W.", rating: 1, date: "Jun 2025", text: "Room was only cleaned once during a three-night stay and no fresh towels unless scheduled." }
    ]
  },
  "casino-rama": {
    name: "Casino Rama Resort",
    slug: "casino-rama",
    city: "Rama (Orillia)", province: "Ontario",
    stars: 4, guestRating: 3.7, reviewCount: 816, casino: true,
    address: "5899 Rama Road, Rama, ON L3V 6H6, Canada", phone: "+1 705-329-3325",
    lat: 44.6417, lng: -79.3502,
    img: "assets/img/casino-rama.jpg",
    author: "malik-osei",
    tags: ["Casino Resort", "Entertainment Centre", "Lake Country"],
    short: "A lake-country resort an easy drive north of the city, pairing a big-name concert hall and a 24-hour gaming floor with suite-style rooms and free parking at the door.",
    amenities: ["24-hour casino (slots, tables, poker)", "5,000-seat Entertainment Centre", "Weirs Chophouse & multiple eateries", "Indoor pool & hot tub", "Fitness centre & spa services", "Free on-site parking", "Complimentary WiFi", "Large suite-style rooms"],
    reviews: [
      { name: "Wolfies2", rating: 5, date: "Oct 2025", text: "Far exceeded my expectations. The concert venue is fantastic and the room was beautiful, clean and quiet." },
      { name: "Ron", rating: 5, date: "Oct 2025", text: "Recently renovated, spacious room with polite, helpful staff and impressive facilities." },
      { name: "Doug", rating: 5, date: "Apr 2025", text: "Comfortable room, excellent breakfast at Weirs, and we loved the hot tub and the new Chow restaurant." },
      { name: "Kevin", rating: 3, date: "Apr 2025", text: "The Noodle Bar and venue staff were great, but several restaurants were closed and there was a faint smell in our non-smoking room." },
      { name: "Lori", rating: 2, date: "Aug 2025", text: "Beautiful hotel, but dining options were limited on weekdays and quality was disappointing." },
      { name: "Sandra", rating: 4, date: "Sep 2025", text: "Great spot for a getaway close to home. The casino floor is huge and the show at the Entertainment Centre was excellent." },
      { name: "Mike", rating: 3, date: "Jun 2025", text: "Rooms are big and comfortable and the pool was nice, but check-in lines were slow." },
      { name: "Arthur", rating: 1, date: "Jul 2026", text: "Disappointing experience — no room service, housekeeping issues and a booking error that wasn't resolved well." },
      { name: "Cheryl", rating: 1, date: "Jan 2026", text: "Expected better: a smoke odour, bathroom floors that needed attention, and no housekeeping over three nights." },
      { name: "Family D.", rating: 1, date: "Nov 2025", text: "Booked an accessible room but the beds were too low for our family member with mobility needs, and we couldn't be moved." }
    ]
  }
};

/* Order hotels appear on the homepage */
const HOTEL_ORDER = ["lake-louise", "empress", "caesars-windsor", "casino-rama"];
