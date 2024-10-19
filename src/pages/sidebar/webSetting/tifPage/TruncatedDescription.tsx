import { useState } from 'react';

// Utility function to strip HTML tags
const stripHtmlTags = (html: string) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const TruncatedDescription = ({ description }: { description: string | undefined }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const wordsLimit = 10;
  const cleanedDescription = stripHtmlTags(description || ""); 
  const words = cleanedDescription.split(' ');

  // Check if the description has more than the specified word limit
  const isLongDescription = words.length > wordsLimit;

  // Handle toggle for "Read More" and "Show Less"
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="text-left">
      {isExpanded ? cleanedDescription : words.slice(0, wordsLimit).join(' ') + (isLongDescription ? '...' : '')}
      {isLongDescription && (
        <button className="text-blue-500" onClick={toggleExpanded}>
          {isExpanded ? 'Show Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

export default TruncatedDescription;
