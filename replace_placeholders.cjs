const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace favicon
html = html.replace(/href="jzexy-logo\.png"/g, 'href=""');

// Replace logo img with text
html = html.replace(/<img src="jzexy-logo\.png"[^>]*>/g, '<div style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 500; color: var(--text-color); margin-top: -10px; margin-bottom: 30px;">RabbitShark</div>');

// Remove other imgs inside image-placeholders
html = html.replace(/<img src="[^"]+\.(png|jpg|jpeg)"[^>]*>/g, '');

// Clean up literal text like "kno.png" inside placeholders
html = html.replace(/kno\.png/g, '');
html = html.replace(/ai fast resume\.png/g, '');

// Replace PDF links with "#"
html = html.replace(/href="[^"]+\.pdf[^"]*"/g, 'href="#"');

fs.writeFileSync('index.html', html);
