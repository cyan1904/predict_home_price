document.getElementById('sendBtn').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value;
    const resultDiv = document.getElementById('result');

    if (!userInput) {
        resultDiv.textContent = 'Vui lòng nhập tin nhắn.';
        return;
    }

    resultDiv.textContent = 'Đang xử lý...';

    try {
        // Thay thế 'http://localhost:5000/predict' bằng URL API Back-end thực tế
        const response = await fetch('https://5000-m-s-1syy9hgqncbz-c.us-central1-0.prod.colab.dev/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: userInput })
        });

        const data = await response.json();
        resultDiv.textContent = `Phản hồi của AI: ${data.prediction}`;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        resultDiv.textContent = 'Có lỗi xảy ra khi kết nối với AI.';
    }

});
