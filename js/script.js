document.getElementById('imageInput').addEventListener('change', function () {
    // Récupérer le fichier sélectionné
    const imageInput = document.getElementById('imageInput').files[0];

    if (imageInput) {
        // Créer un FileReader pour lire l'image
        const reader = new FileReader();

        // Lors de la lecture du fichier, afficher l'image
        reader.onload = function (e) {
            const uploadedImage = document.getElementById("uploadedImage");
            const uploadedImageTitle = document.getElementById("uploadedImageTitle");
            const Btn = document.getElementById("Btn")
            uploadedImage.src = e.target.result; // Affiche l'image sélectionnée
            uploadedImage.style.display = 'block'; // Rend l'image visible
            uploadedImageTitle.style.display = 'block';
            Btn.style.display = 'block';

            

            
        };

        // Lire l'image en tant qu'URL de données (base64)
        reader.readAsDataURL(imageInput);
      
    }
});

const uploadedImage = document.getElementById("uploadedImage");
const noisyCanvas = document.getElementById("noisyCanvas");
const noisyImageTitle = document.getElementById("noisyImageTitle");
const invertedCanvas = document.getElementById("invertedCanvas");
const invertedImageTitle = document.getElementById("invertedImageTitle");
const segmentedCanvas =document.getElementById("segmentedCanvas");
const segmentedImageTitle = document.getElementById("segmentedImageTitle");

function addNoise(){
    const ctx = noisyCanvas.getContext('2d');
    const img = new Image();

    img.src = uploadedImage.src;

    img.onload = function(){

        // Adapter la taille du canevas à l'image
        noisyCanvas.width = img.width;
        noisyCanvas.height = img.height;

        // Dessiner l'image sur le canevas
        ctx.drawImage(img, 0, 0);

        // Obtenir les données des pixels de l'image
        const imageData = ctx.getImageData(0, 0, noisyCanvas.width, noisyCanvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i = i + 4) {

            // Ajouter du bruit aléatoire sur les composantes RGB
            const randomNoise = Math.random() * 100 - 50; // Valeur aléatoire entre -50 et 50
            data[i] += randomNoise;      // data[i] est la composante rouge
            data[i + 1] += randomNoise; // data[i + 1] est la composante verte
            data[i + 2] += randomNoise; // data[i + 2] est la composante bleue
        }

        // Mettre à jour l'image sur le canevas avec les pixels bruités
        ctx.putImageData(imageData, 0, 0);


        //affichage
        noisyImageTitle.style.display = "block";
        noisyCanvas.style.display = "block";
        // Masquer l'image inversée et l'image segmentée si elles étaient visibles
        invertedImageTitle.style.display = "none";
        invertedCanvas.style.display = "none";
        segmentedImageTitle.style.display ="none";
        segmentedCanvas.style.display = "none";
    };

}

function invertColors() {
    const ctx = invertedCanvas.getContext('2d');
    const img = new Image();

    img.src = uploadedImage.src;

    img.onload = function() {
        invertedCanvas.width = img.width;
        invertedCanvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, invertedCanvas.width, invertedCanvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];       // Inversion de la composante rouge
            data[i + 1] = 255 - data[i + 1]; // Inversion de la composante verte
            data[i + 2] = 255 - data[i + 2]; // Inversion de la composante bleue
        }

        ctx.putImageData(imageData, 0, 0);

        // Afficher le résultat de l'image inversée
        invertedImageTitle.style.display = "block";
        invertedCanvas.style.display = "block";

        // Masquer l'image bruitée et l'image segmentée si elles étaient visibles
        noisyImageTitle.style.display = "none";
        noisyCanvas.style.display = "none";
        segmentedImageTitle.style.display ="none";
        segmentedCanvas.style.display = "none";
    };
}

function segment() {
    const ctx = segmentedCanvas.getContext('2d');
    const img = new Image();

    img.src = uploadedImage.src;

    img.onload = function () {
        
        segmentedCanvas.width = img.width;
        segmentedCanvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, segmentedCanvas.width, segmentedCanvas.height);
        const data = imageData.data;

        // Seuil pour la segmentation
        const seuil = 128; // Valeur entre 0 et 255 (peut être ajustée)

        for (let i = 0; i < data.length; i += 4) {
            // Convertir chaque pixel en niveaux de gris pour simplifier la segmentation
            const brightness = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];

            // Si la luminosité est supérieure au seuil, rendre le pixel blanc, sinon le rendre noir
            if (brightness > seuil) {
                data[i] = 255; // rouge
                data[i + 1] = 255; // vert
                data[i + 2] = 255; // bleu
            } else {
                data[i] = 0; // rouge
                data[i + 1] = 0; // vert
                data[i + 2] = 0; // bleu
            }
        }

        // Appliquer les modifications au canevas
        ctx.putImageData(imageData, 0, 0);

        // Afficher le résultat de la segmentation
        segmentedImageTitle.style.display = "block";
        segmentedCanvas.style.display = "block";

        // Masquer les autres images transformées si elles étaient visibles
        noisyImageTitle.style.display = "none";
        noisyCanvas.style.display = "none";
        invertedImageTitle.style.display = "none";
        invertedCanvas.style.display = "none";
    };
}



// Ajouter les événement au bouton
document.getElementById("Btn").addEventListener("click", function(){

    const transformSelect = document.getElementById("transformSelect").value;

    if (transformSelect == "noise"){
        addNoise();
    }
    else if (transformSelect == "invert"){
        invertColors();
    }

    else if (transformSelect == "segment"){
        segment();
    }
});