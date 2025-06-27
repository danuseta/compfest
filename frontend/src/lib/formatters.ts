export const formatPrice = (price: number): string => {
  // Convert to integer and format with Indonesian thousands separator (dots)
  const roundedPrice = Math.round(price)
  return `Rp${roundedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
}

export const formatDate = (dateString: string): string => {
  if (!dateString) return 'N/A'
  
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return 'N/A'
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
} 