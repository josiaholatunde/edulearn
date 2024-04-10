export default function capitalizeAndReplace(str) {
    if (!str || str?.length === 0) return str
    str = str.charAt(0).toUpperCase() + str.slice(1);
    // Replace underscores with spaces
    str = str.replace(/_/g, ' ');
    return str;
}