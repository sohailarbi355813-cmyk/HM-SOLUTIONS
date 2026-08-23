const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');

async function main() {
    console.log("Starting background removal...");
    try {
        const blob = await removeBackground("public/images/logo.jpg");
        const buffer = Buffer.from(await blob.arrayBuffer());
        fs.writeFileSync("public/images/logo_transparent.png", buffer);
        console.log("Background removal completed. Saved to public/images/logo_transparent.png");
    } catch (e) {
        console.error("Error:", e);
    }
}
main();
