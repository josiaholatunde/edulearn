export default function capitalizeAndReplace(str) {
    // Capitalize first letter
    str = str.charAt(0).toUpperCase() + str.slice(1);
    // Replace underscores with spaces
    str = str.replace(/_/g, ' ');
    return str;
}