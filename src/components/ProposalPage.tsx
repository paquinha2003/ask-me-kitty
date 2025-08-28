import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import kittenHappy from "@/assets/kitten-happy.png";
import kittenSad from "@/assets/kitten-sad.png";

const ProposalPage = () => {
  const [noClickCount, setNoClickCount] = useState(0);
  const [isAccepted, setIsAccepted] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  const noTexts = [
    "Não",
    "Tem certeza?",
    "Pensa bem...",
    "😿 Por favor...",
    "Só uma chance?",
    "Eu prometo ser fofo! 🥺",
    "Último não? 💔"
  ];

  const handleNoClick = () => {
    if (noClickCount < noTexts.length - 1) {
      setNoClickCount(noClickCount + 1);
    }
  };

  const handleYesClick = () => {
    setIsAccepted(true);
    setShowHearts(true);
  };

  useEffect(() => {
    if (showHearts) {
      const timer = setTimeout(() => setShowHearts(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showHearts]);

  const yesButtonSize = () => {
    if (noClickCount === 0) return "lg";
    if (noClickCount <= 2) return "xl";
    if (noClickCount <= 4) return "giant";
    return "giant";
  };

  const yesButtonScale = () => {
    if (noClickCount === 0) return "scale-100";
    if (noClickCount <= 2) return "scale-110";
    if (noClickCount <= 4) return "scale-125";
    return "scale-150";
  };

  if (isAccepted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Floating hearts animation */}
        {showHearts && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <Heart
                key={i}
                className={`absolute text-love-red heart-fall`}
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  fontSize: `${Math.random() * 20 + 10}px`,
                }}
              />
            ))}
          </div>
        )}

        <div className="text-center space-y-6 bounce-in">
          <div className="relative">
            <img
              src={kittenHappy}
              alt="Gatinho feliz"
              className="w-48 h-48 mx-auto rounded-full shadow-romantic pulse-love"
            />
            <Heart className="absolute -top-2 -right-2 text-love-red w-8 h-8 heart-float" />
            <Heart className="absolute -bottom-2 -left-2 text-love-red w-6 h-6 heart-float" style={{ animationDelay: "1s" }} />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold heart-gradient bg-clip-text text-transparent">
              Eu sabia! ❤️
            </h1>
            <p className="text-xl md:text-2xl text-love-rose font-medium">
              Vai ser o casal mais fofo do mundo! 🥰
            </p>
            <div className="text-6xl animate-pulse">💕</div>
          </div>

          <Button
            onClick={() => window.location.reload()}
            variant="love"
            size="lg"
            className="mt-8"
          >
            Fazer novamente 💖
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold heart-gradient bg-clip-text text-transparent leading-tight">
            Quer namorar comigo, Ana Carolina?
          </h1>
          <div className="text-2xl">💕</div>
        </div>

        {/* Kitten */}
        <div className="relative">
          <img
            src={noClickCount > 0 ? kittenSad : kittenHappy}
            alt="Gatinho mascote"
            className={`w-40 h-40 mx-auto rounded-full shadow-soft transition-smooth ${
              noClickCount > 0 ? "wiggle" : "heart-float"
            }`}
          />
          {noClickCount === 0 && (
            <>
              <Heart className="absolute -top-1 -right-1 text-love-red w-6 h-6 heart-float" />
              <Heart className="absolute -bottom-1 -left-1 text-love-red w-4 h-4 heart-float" style={{ animationDelay: "1.5s" }} />
            </>
          )}
        </div>

        {/* Buttons */}
        <div className="space-y-4 flex flex-col items-center">
          <Button
            onClick={handleYesClick}
            variant="love"
            size={yesButtonSize()}
            className={`${yesButtonScale()} transition-all duration-500 z-10 relative`}
          >
            Sim! 💖
          </Button>

          {noClickCount < noTexts.length - 1 && (
            <Button
              onClick={handleNoClick}
              variant="reject"
              size="default"
              className="transition-all duration-300"
            >
              {noTexts[noClickCount]}
            </Button>
          )}
        </div>

        {/* Emotional message based on clicks */}
        {noClickCount > 2 && (
          <div className="text-center text-love-rose font-medium animate-pulse">
            <p>O gatinho está muito triste... 😿</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalPage;