document.getElementById('predictBtn').addEventListener('click', async () => {
    const MedInc = parseFloat(document.getElementById('MedInc').value);
    const HouseAge = parseFloat(document.getElementById('HouseAge').value);
    const AveRooms = parseFloat(document.getElementById('AveRooms').value);
    const AveBedrms = parseFloat(document.getElementById('AveBedrms').value);
    const Population = parseFloat(document.getElementById('Population').value);
    const AveOccup = parseFloat(document.getElementById('AveOccup').value);
    const Latitude = parseFloat(document.getElementById('Latitude').value);
    const Longitude = parseFloat(document.getElementById('Longitude').value);

    const predictionResult = document.getElementById('predictionResult');

    // Kiểm tra xem tất cả các trường đã được điền số hợp lệ chưa
    if (isNaN(MedInc) || isNaN(HouseAge) || isNaN(AveRooms) || isNaN(AveBedrms) || 
        isNaN(Population) || isNaN(AveOccup) || isNaN(Latitude) || isNaN(Longitude)) {
        predictionResult.textContent = 'Vui lòng nhập tất cả các giá trị số hợp lệ!';
        predictionResult.style.color = '#dc3545'; // Màu đỏ cho lỗi
        return;
    }

    predictionResult.textContent = 'Đang dự đoán...';
    predictionResult.style.color = '#007bff'; // Màu xanh dương khi đang tải

    try {
        // Địa chỉ API Back-end của bạn.
        // Khi chạy trên máy local, nó sẽ là http://localhost:5000/predict
        // Khi triển khai lên server, bạn sẽ thay thế bằng URL thực tế của API Back-end.
        const response = await fetch('https://5000-m-s-1syy9hgqncbz-c.us-central1-0.prod.colab.dev/predict', { 
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify({
                MedInc: MedInc,
                HouseAge: HouseAge,
                AveRooms: AveRooms,
                AveBedrms: AveBedrms,
                Population: Population,
                AveOccup: AveOccup,
                Latitude: Latitude,
                Longitude: Longitude
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // Giả sử Back-end trả về kết quả dự đoán trong trường 'prediction'
        // Giá trị dự đoán sẽ là đơn vị $100.000, nên nhân với 100000 để có giá thực
        const predictedValue = (data.prediction * 100000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        
        predictionResult.textContent = `Giá nhà dự đoán: ${predictedValue}`;
        predictionResult.style.color = '#28a745'; // Màu xanh lá cây cho kết quả thành công

    } catch (error) {
        console.error('Lỗi khi gọi API dự đoán:', error);
        predictionResult.textContent = 'Có lỗi xảy ra khi dự đoán giá nhà. Vui lòng thử lại.';
        predictionResult.style.color = '#dc3545'; // Màu đỏ cho lỗi
    }
});



