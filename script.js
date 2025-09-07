/* script.js v13 - FE gọi backend Hugging Face Spaces (FastAPI)
 * LƯU Ý: ĐỔI API thành URL Space của bạn!
 */
const API = 'https://cyan1904-house-predict.hf.space'; // <-- thay bằng URL của bạn
console.log('script v13 loaded; API =', API);

// ---- tiện ích ----
const $ = (id) => document.getElementById(id);

function getFloat(id) {
  const v = parseFloat($(id).value);
  return Number.isFinite(v) ? v : NaN;
}

function setResult(text, color = '#333') {
  const el = $('predictionResult');
  el.textContent = text;
  el.style.color = color;
}

function withTimeout(ms) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), ms);
  return { signal: controller.signal, cancel: () => clearTimeout(t) };
}

// ---- handler ----
$('predictBtn').addEventListener('click', async () => {
  const MedInc     = getFloat('MedInc');
  const HouseAge   = getFloat('HouseAge');
  const AveRooms   = getFloat('AveRooms');
  const AveBedrms  = getFloat('AveBedrms');
  const Population = getFloat('Population');
  const AveOccup   = getFloat('AveOccup');
  const Latitude   = getFloat('Latitude');
  const Longitude  = getFloat('Longitude');

  // kiểm tra hợp lệ
  if ([MedInc, HouseAge, AveRooms, AveBedrms, Population, AveOccup, Latitude, Longitude]
      .some(Number.isNaN)) {
    setResult('Vui lòng nhập tất cả các giá trị số hợp lệ!', '#dc3545');
    return;
  }

  // trạng thái loading
  const btn = $('predictBtn');
  btn.disabled = true;
  btn.textContent = 'Đang dự đoán...';
  setResult('Đang dự đoán...', '#007bff');

  // gọi API (JSON) — Spaces hỗ trợ CORS chuẩn
  const payload = { MedInc, HouseAge, AveRooms, AveBedrms, Population, AveOccup, Latitude, Longitude };
  const { signal, cancel } = withTimeout(15000); // timeout 15s

  try {
    const resp = await fetch(`${API.replace(/\/+$/,'')}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal
    });

    if (!resp.ok) {
      // cố gắng đọc lỗi JSON từ server nếu có
      let errText = `HTTP ${resp.status}`;
      try {
        const j = await resp.json();
        if (j && j.error) errText += ` - ${j.error}`;
      } catch (_) {}
      throw new Error(errText);
    }

    const data = await resp.json();
    if (data && data.ok === false) {
      throw new Error(data.error || 'Server trả về lỗi.');
    }
    if (!data || typeof data.prediction !== 'number') {
      throw new Error('Phản hồi không có trường prediction.');
    }

    // Giá trị dự đoán là đơn vị $100.000 (như mô hình California)
    const vnd = (data.prediction * 100000)
      .toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

    setResult(`Giá nhà dự đoán: ${vnd}`, '#28a745');
  } catch (err) {
    console.error('Lỗi khi gọi API dự đoán:', err);
    const msg = err.name === 'AbortError'
      ? 'Hết thời gian chờ (timeout). Vui lòng thử lại.'
      : `Có lỗi xảy ra khi dự đoán: ${err.message}`;
    setResult(msg, '#dc3545');
  } finally {
    cancel();
    btn.disabled = false;
    btn.textContent = 'Dự đoán giá nhà';
  }
});
