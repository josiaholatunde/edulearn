export default function convertToPercentage(level) {
    // Range of input values
    const minX = 1;
    const maxX = 10;
    
    // Range of percentages
    const minPercentage = 100;
    const maxPercentage = 10;
    
    // Calculate the percentage using linear interpolation
    const percentage = minPercentage + ((level - minX) / (maxX - minX)) * (maxPercentage - minPercentage);
    
    return percentage;
}