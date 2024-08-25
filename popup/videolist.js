
    // Liste von YouTube-Video-IDs
    const videoIDs = [
        "rpEt8xHJRzQ", // 1 Meter Hohen Kante
        "MxYA5Mwl0AA", // Ich will Bauarbeiter werden
        "dVqoI-Jk78g", // fuck off
        "A84acXI_UQc", // motivation
        "cw7_9Ci4QAo", // ASDF ur a Idiot
        "iadLV6To-hg", //Muffin Time
        "Zp7liIbYqaw", // wanna play catch the knive
        // Füge hier weitere Video-IDs hinzu
    ];

    // Wähle zufällig eine Video-ID aus
    const randomIndex = Math.floor(Math.random() * videoIDs.length);
    const selectedVideoID = videoIDs[randomIndex];

    // Setze die Video-ID im iframe-Element
    const iframe = document.getElementById("youtubeVideo");
    iframe.src = `https://www.youtube.com/embed/${selectedVideoID}?autoplay=1&modestbranding=1&controls=0&rel=0"`;
