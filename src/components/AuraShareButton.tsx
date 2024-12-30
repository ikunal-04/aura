import React from 'react';
import html2canvas from 'html2canvas';
import { RetroButton } from '@/components/RetroButton';

interface AuraShareButtonProps {
  auraScore: number;
  divRef: React.RefObject<HTMLDivElement | null>;
  userAddress: string;
}

const AuraShareButton: React.FC<AuraShareButtonProps> = ({ auraScore, divRef, userAddress }) => {
  const handleShare = async () => {
    console.log('Sharing on Twitter...', divRef);
    if (!divRef.current) return;

    try {
      // Create a temporary div for better rendering
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '-9999px';
      document.body.appendChild(tempDiv);

      // Clone the original content
      const clone = divRef.current.cloneNode(true) as HTMLElement;

      // Find the address element in the clone and ensure it's rendered properly
      const addressElements = clone.querySelectorAll('input, .bg-purple-400\\/10');
      addressElements.forEach(element => {
        if (element instanceof HTMLElement) {
          element.innerText = userAddress;
          element.style.fontFamily = 'monospace';
          element.style.fontSize = '16px';
          element.style.letterSpacing = '0.5px';
          element.style.color = '#fff';
          element.style.textAlign = 'center';
          element.style.border = 'none';
          element.style.background = 'transparent';
        }
      });

      tempDiv.appendChild(clone);

      // Take the screenshot with optimized settings
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#1a1a2e',
        logging: false,
        onclone: (document) => {
          const elements = document.getElementsByTagName('*');
          for (let i = 0; i < elements.length; i++) {
            const element = elements[i] as HTMLElement;
            if (element.style.transition) {
              element.style.transition = 'none';
            }
          }
        }
      });

      // Clean up temporary elements
      document.body.removeChild(tempDiv);

      const filename = `aura-score-${auraScore}-${userAddress.slice(0, 5)}.png`;
      const dataUrl = canvas.toDataURL('image/png', 1.0);

      // Download the image
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();

      // Upload to IPFS
      const res = await pinFileToIPFS(dataUrl, filename);
      const imgUrl = `https://ipfs.io/ipfs/${res}`;

      // Share on Twitter
      const tweetText = `This is my onchain Aura: ${auraScore}! XD\n\nCheck out on @onchainaura_fun: ${imgUrl}\n\nCheck your own score at https://www.onchainaura.fun`;
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
      window.open(twitterUrl, '_blank');
    } catch (error) {
      console.error('Error taking screenshot:', error);
    }
  };

  function dataUrlToBlob(dataUrl: string): Blob {
    // 1) Split the data URL
    const [metadata, base64Data] = dataUrl.split(',');

    // 2) Extract the MIME type if needed (e.g., "image/png")
    //    Not strictly necessary if we know it's always PNG, but let's do it anyway.
    const mimeMatch = metadata.match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/png';

    // 3) Decode the base64 data to binary
    const byteChars = atob(base64Data);
    const byteNumbers = new Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) {
      byteNumbers[i] = byteChars.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // 4) Create a new Blob with the binary data
    return new Blob([byteArray], { type: mime });
  }

  async function pinFileToIPFS(fileData: string, filename: string): Promise<string> {
    try {
      // fileData is base64 encoded image data

      console.log('Pinning to IPFS...', filename);
      const blob = dataUrlToBlob(fileData);
      const data = new FormData();
      data.append("file", blob, filename);


      const request = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
          },
          body: data,
        }
      );
      const response = await request.json();
      console.log(response);
      return response.IpfsHash;
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  return (
    <div className="inline-flex">
      <RetroButton onClick={handleShare}>
        Share on X
      </RetroButton>
    </div>
  );
};

export default AuraShareButton;
