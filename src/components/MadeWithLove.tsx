export default ({ 
  companyName = "CoolTech", 
  companyUrl = "https://www.cooltech.quest",
  theme = "dark" 
}) => {
  const isDark = theme === "dark";
  
  return (
    <div className={`flex items-center justify-center gap-2 p-4 text-sm ${
      isDark ? 'text-gray-300' : 'text-gray-600'
    }`}>
      <span>Made with</span>
      <span className="text-red-500 animate-pulse">❤️</span>
      <span>by</span>
      <a 
        href={companyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`font-semibold transition-colors duration-200 hover:underline ${
          isDark 
            ? 'text-blue-400 hover:text-blue-300' 
            : 'text-blue-600 hover:text-blue-800'
        }`}
      >
        {companyName}
      </a>
    </div>
  );
};
