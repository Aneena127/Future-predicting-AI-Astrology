/**
 * Absurd Horoscope AI - Short & Savage Roast Edition
 * Short, punchy, savage, and intentionally wrong astrological roasts.
 */

const ZODIAC_SIGNS = [
    { name: "Capricorn", start: [12, 22], end: [1, 19], element: "Cardboard Energy", planet: "Unsold Trash" },
    { name: "Aquarius", start: [1, 20], end: [2, 18], element: "Flat Tap Water", planet: "Microwave Noise" },
    { name: "Pisces", start: [2, 19], end: [3, 20], element: "Soggy Cereal", planet: "Disconnected WiFi" },
    { name: "Aries", start: [3, 21], end: [4, 19], element: "Expired Salsa", planet: "Burnt Toast" },
    { name: "Taurus", start: [4, 20], end: [5, 20], element: "Uncooked Pasta", planet: "Overinflated Ego" },
    { name: "Gemini", start: [5, 21], end: [6, 20], element: "Chewed Bubblegum", planet: "Spilled Gatorade" },
    { name: "Cancer", start: [6, 21], end: [7, 22], element: "Pure Drama & Tears", planet: "Silent Treatment" },
    { name: "Leo", start: [7, 23], end: [8, 22], element: "Cheap Glitter", planet: "Broken Ring Light" },
    { name: "Virgo", start: [8, 23], end: [9, 22], element: "Unused Sticky Notes", planet: "Corrupted Excel File" },
    { name: "Libra", start: [9, 23], end: [10, 22], element: "Pure Indecision", planet: "Permanent Retrograde" },
    { name: "Scorpio", start: [10, 23], end: [11, 21], element: "Petty Revenge", planet: "Dark Mode Delusion" },
    { name: "Sagittarius", start: [11, 22], end: [12, 21], element: "Unfiltered Chaos", planet: "No Service" }
];

const PLANETARY_EXCUSES = [
    "because the universe swiped left on you.",
    "due to Mercury muting your notifications.",
    "because Saturn looked at your chart and started laughing.",
    "as Venus blocked you on all celestial platforms.",
    "because Pluto has better things to do than help you.",
    "due to Jupiter classifying your luck as 'Zero'."
];

const ABSURD_LUCKY_NUMBERS = [
    "0", "-404", "0.00", "NaN", "Error 404", "Minus Infinity"
];

const ABSURD_LUCKY_COLORS = [
    "Anxious Grey", "Regret Black", "Invisible Beige", "Disappointed Red"
];

/**
 * Calculates absurd zodiac metadata based on month and day
 */
function getAbsurdZodiac(day, month) {
    for (const sign of ZODIAC_SIGNS) {
        const [sMonth, sDay] = sign.start;
        const [eMonth, eDay] = sign.end;

        if (sMonth === 12 && eMonth === 1) {
            if ((month === 12 && day >= sDay) || (month === 1 && day <= eDay)) return sign;
        } else if ((month === sMonth && day >= sDay) || (month === eMonth && day <= eDay)) {
            return sign;
        }
    }
    return ZODIAC_SIGNS[0];
}

/**
 * Formats date into readable string (e.g. 13 July 2004)
 */
function formatDate(day, month, year) {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const pad = (n) => n.toString().padStart(2, '0');
    return {
        formatted: `${pad(day)} ${monthNames[month - 1]} ${year}`,
        short: `${pad(day)}/${pad(month)}/${year}`,
        day,
        month,
        year
    };
}

/**
 * Core prediction function - Short & Savage Roasts
 */
function generateAbsurdPrediction(name, dobString, question) {
    if (!dobString) {
        return { error: "Enter your Date of Birth so the stars can roast you properly." };
    }

    const [yearStr, monthStr, dayStr] = dobString.split('-');
    const day = parseInt(dayStr, 10);
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return { error: "Invalid date! Even your date formatting is disappointing." };
    }

    const dateObj = formatDate(day, month, year);
    const zodiac = getAbsurdZodiac(day, month);
    const excuse = PLANETARY_EXCUSES[Math.floor(Math.random() * PLANETARY_EXCUSES.length)];
    const qLower = (question || "").toLowerCase().trim();
    const userName = name.trim() ? name.trim() : "You";

    let predictionText = "";
    let cosmicVerdict = "";

    // Short & Savage Roast Logic
    if (qLower.includes("marri") || qLower.includes("wedding") || qLower.includes("spouse") || qLower.includes("husband") || qLower.includes("wife") || qLower.includes("partner")) {
        const variants = [
            `You got married on **${dateObj.short}** when you were 0 days old. You've been single ever since because your baby diaper had more personality.`,
            `Your wedding happened on **${dateObj.formatted}** to a hospital blanket. Even the blanket filed for divorce 10 minutes later.`,
            `The stars scheduled your marriage on **${dateObj.formatted}**. You were 0 years old, and honestly, that was your peak attractiveness.`
        ];
        predictionText = variants[Math.floor(Math.random() * variants.length)];
        cosmicVerdict = "ROAST: Married at 0 Days Old, Single Forever";
    } 
    else if (qLower.includes("rich") || qLower.includes("million") || qLower.includes("billion") || qLower.includes("money") || qLower.includes("wealth") || qLower.includes("cash") || qLower.includes("crypto") || qLower.includes("bitcoin") || qLower.includes("lottery")) {
        const variants = [
            `Your bank account peaked on **${dateObj.short}** when you owned \$0. It's been downhill ever since.`,
            `You became a billionaire on **${dateObj.formatted}** with 100% cuteness. Now you have 0 cuteness and \$0.`,
            `You won \$50,000,000 on **${dateObj.formatted}**, but traded it for a plastic pacifier. Financial genius!`
        ];
        predictionText = variants[Math.floor(Math.random() * variants.length)];
        cosmicVerdict = "ROAST: Bank Account Broke Since Birth";
    }
    else if (qLower.includes("car") || qLower.includes("ferrari") || qLower.includes("lamborghini") || qLower.includes("drive") || qLower.includes("vehicle") || qLower.includes("bike") || qLower.includes("bmw")) {
        const variants = [
            `You bought a Ferrari on **${dateObj.formatted}**. You couldn't reach the pedals at 0 days old, and you still can't drive.`,
            `Your dream car was delivered on **${dateObj.short}**. Unfortunately, your license was revoked at birth for excessive crying.`
        ];
        predictionText = variants[Math.floor(Math.random() * variants.length)];
        cosmicVerdict = "ROAST: License Revoked at Birth";
    }
    else if (qLower.includes("job") || qLower.includes("career") || qLower.includes("ceo") || qLower.includes("work") || qLower.includes("boss") || qLower.includes("promotion") || qLower.includes("salary")) {
        const variants = [
            `You retired on **${dateObj.formatted}** at 2 hours old. That was literally your only successful career move.`,
            `You became CEO on **${dateObj.short}**, but got fired 5 minutes later for falling asleep during tummy time.`
        ];
        predictionText = variants[Math.floor(Math.random() * variants.length)];
        cosmicVerdict = "ROAST: Fired at Age 0";
    }
    else if (qLower.includes("soulmate") || qLower.includes("love") || qLower.includes("crush") || qLower.includes("dating") || qLower.includes("relationship")) {
        const soulmateYear = year - 104;
        const variants = [
            `Your soulmate was born in **${soulmateYear}** and died 80 years before you were born. Even the universe kept them away from you.`,
            `Your soulmate met you on **${dateObj.formatted}**, took one look at you in the crib, and left the galaxy.`
        ];
        predictionText = variants[Math.floor(Math.random() * variants.length)];
        cosmicVerdict = "ROAST: Ghosted by the Universe";
    }
    else if (qLower.includes("die") || qLower.includes("death") || qLower.includes("pass away") || qLower.includes("live") || qLower.includes("longevity") || qLower.includes("age")) {
        predictionText = `You will live until year **${year + 300}**, but only as an annoying pop-up ad on a smart fridge.`;
        cosmicVerdict = "ROAST: Immortal Pop-Up Ad";
    }
    else if (qLower.includes("exam") || qLower.includes("grade") || qLower.includes("pass") || qLower.includes("fail") || qLower.includes("study") || qLower.includes("college") || qLower.includes("university")) {
        predictionText = `You failed your first life exam on **${dateObj.formatted}** by crying when the doctor slapped your back.`;
        cosmicVerdict = "ROAST: Failed Life Exam Day 1";
    }
    else {
        // Generic short savage roasts
        const genericVariants = [
            `Your peak life moment happened on **${dateObj.formatted}** when you were born. It's been zero progress ever since ${excuse}`,
            `The stars reviewed your question and decided your destiny was fulfilled on **${dateObj.short}** while you were taking a nap.`,
            `On **${dateObj.formatted}**, you achieved peak intelligence. Unfortunately, you haven't used it once since then.`
        ];
        predictionText = genericVariants[Math.floor(Math.random() * genericVariants.length)];
        cosmicVerdict = "ROAST: Peak Was Day 1";
    }

    return {
        name: userName,
        dob: dateObj.formatted,
        shortDob: dateObj.short,
        zodiac: zodiac.name,
        zodiacElement: zodiac.element,
        rulingPlanet: zodiac.planet,
        prediction: predictionText,
        verdict: cosmicVerdict,
        excuse: excuse,
        luckyNumber: ABSURD_LUCKY_NUMBERS[Math.floor(Math.random() * ABSURD_LUCKY_NUMBERS.length)],
        luckyColor: ABSURD_LUCKY_COLORS[Math.floor(Math.random() * ABSURD_LUCKY_COLORS.length)],
        timestamp: new Date().toLocaleTimeString()
    };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateAbsurdPrediction, getAbsurdZodiac };
}
