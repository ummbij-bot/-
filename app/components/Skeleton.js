export default function Skeleton({ className = "", style = {} }) {
  return (
    <div 
      className={`animate-pulse bg-gray-200 rounded-md ${className}`} 
      style={{ ...style }}
    />
  );
}
