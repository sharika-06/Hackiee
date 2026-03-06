const test = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/verify-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: 'console.log("Hello, World!");', questionId: 'hello-world', language: 'javascript' })
        });
        const data = await res.json();
        console.log("Status:", res.status);
        console.log("Data:", data);
    } catch (e) {
        console.error(e);
    }
};
test();
