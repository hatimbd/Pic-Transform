# Projet de Transformation d'Image

Ce projet est une application web d'une page qui permet aux utilisateurs de télécharger une image, puis de choisir et d'appliquer différentes transformations sur celle-ci. Actuellement, trois transformations sont disponibles : l'ajout de bruit, l'inversion des couleurs, et la segmentation de l'image.


## Fonctionnalités

### 1. Téléchargement d'image

- L'utilisateur peut charger une image locale depuis son ordinateur en utilisant un champ de téléchargement de fichier.
- Les formats d'image supportés incluent les formats courants tels que JPEG, PNG, etc.
### 2. Transformations d'image
- **Ajouter du bruit** : Cette transformation ajoute un bruit aléatoire aux canaux de couleurs de l'image, créant ainsi un effet de bruit visuel.
- **Inverser les couleurs** : Cette transformation inverse les valeurs des canaux RGB de l'image, produisant un effet de négatif.

- **Segmentation d'image** : Cette transformation segmente l'image en identifiant les différentes régions d'intérêt à l'intérieur de l'image (par exemple, en fonction des couleurs ou des contours).

### 3. Interface utilisateur intuitive
- L'application utilise **Bootstrap** pour fournir une interface utilisateur réactive et élégante.
- Après avoir téléchargé une image, l'utilisateur peut choisir la transformation qu'il souhaite appliquer via une liste déroulante.
- Un bouton "Appliquer" permet de déclencher la transformation choisie et d'afficher le résultat directement sur la page.
- Les transformations appliquées sont affichées dans des canvases distincts pour une comparaison facile entre l'image originale et les résultats transformés.




## Installation et Utilisation

### Prérequis
- Aucun framework backend n'est requis, tout se fait côté client dans le navigateur.
- Aucune installation spéciale n'est nécessaire. Vous avez juste besoin d'un navigateur moderne prenant en charge HTML5, CSS3 et JavaScript.

### Instructions pour l'utilisation
1. **Téléchargement du projet :**
   Clonez ce dépôt en utilisant la commande suivante :
   ```bash
   git clone https://github.com/hatimbd/image_transformation.git
