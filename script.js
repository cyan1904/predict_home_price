body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #eef2f7;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    color: #333;
}

.container {
    background-color: #ffffff;
    padding: 30px 40px;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
    box-sizing: border-box;
}

h1 {
    color: #2c3e50;
    margin-bottom: 15px;
    font-size: 2.2em;
}

p {
    font-size: 1.1em;
    line-height: 1.6;
    color: #555;
    margin-bottom: 25px;
}

.input-group {
    margin-bottom: 18px;
    text-align: left;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #34495e;
    font-size: 1em;
}

input[type="number"] {
    width: calc(100% - 22px); /* Kích thước đầy đủ trừ padding và border */
    padding: 12px 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1.05em;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.08);
    transition: border-color 0.3s ease;
}

input[type="number"]:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
}

button {
    width: 100%;
    padding: 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.15em;
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
}

.result-box {
    margin-top: 30px;
    padding: 20px;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    text-align: left;
}

.result-box h2 {
    color: #2c3e50;
    margin-top: 0;
    font-size: 1.6em;
}

#predictionResult {
    font-size: 1.3em;
    font-weight: bold;
    color: #28a745; /* Màu xanh lá cây cho kết quả */
    margin: 0;
}
