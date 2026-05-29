document.getElementById('messageForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('senderName').value;
    const uid = document.getElementById('targetUID').value;
    const messageBoxContent = document.getElementById('messageBox').value;
    const fileInput = document.getElementById('txtFile');
    const delay = parseInt(document.getElementById('delaySeconds').value) * 1000;
    const statusDiv = document.getElementById('status');
    const sendBtn = document.getElementById('sendBtn');

    let messagesToSend = [];

    // Logic: Agar message box me message hai to wahi lo, varna file se lo
    if (messageBoxContent.trim() !== "") {
        messagesToSend.push(messageBoxContent);
    } else if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const text = await file.text();
        messagesToSend = text.split('\n').filter(line => line.trim() !== "");
    } else {
        alert("Kripya message likhein ya TXT file select karein!");
        return;
    }

    sendBtn.disabled = true;
    sendBtn.innerText = "Sending...";

    for (let i = 0; i < messagesToSend.length; i++) {
        const finalMessage = `${name}: ${messagesToSend[i]}`;
        
        // Console par dikhayenge (Kyunki real FB API ke liye access token chahiye hota hai)
        console.log(`Sending to UID ${uid}: ${finalMessage}`);
        statusDiv.innerText = `Bhez raha hoon: ${i + 1}/${messagesToSend.length}`;

        // Yahan real API call ho sakti hai (Jaise Facebook Graph API)
        // Abhi ke liye hum delay simulate kar rahe hain
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    statusDiv.innerText = "Saare messages bhez diye gaye!";
    sendBtn.disabled = false;
    sendBtn.innerText = "Start Sending";
});

