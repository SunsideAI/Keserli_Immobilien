"use client";

import { useState } from "react";
import {
  Home,
  Search,
  TrendingUp,
  MessageCircle,
  Building2,
  Building,
  Map,
  Zap,
  Calendar,
  Clock,
  HelpCircle,
  Key,
  Users,
  HeartCrack,
  BarChart3,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ratgeberQuestions, ratgeberResults } from "@/data/ratgeber-questions";
import { siteConfig } from "@/data/site-config";
import Button from "@/components/ui/Button";

const iconMap: Record<string, React.ElementType> = {
  Home,
  Search,
  TrendingUp,
  MessageCircle,
  Building2,
  Building,
  Map,
  Zap,
  Calendar,
  Clock,
  HelpCircle,
  Key,
  Users,
  HeartCrack,
  BarChart3,
};

export default function RatgeberWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const totalSteps = ratgeberQuestions.length;
  const progress = isComplete
    ? 100
    : ((currentStep) / totalSteps) * 100;

  const handleSelect = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));

    // Auto-advance after short delay
    setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setIsComplete(true);
      }
    }, 300);
  };

  const handleBack = () => {
    if (isComplete) {
      setIsComplete(false);
    } else if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsComplete(false);
  };

  const currentQuestion = ratgeberQuestions[currentStep];
  const resultKey = answers.intention || "sell";
  const result = ratgeberResults[resultKey];

  return (
    <div className="bg-white rounded-2xl shadow-card-hover overflow-hidden">
      {/* Progress bar */}
      <div className="h-1.5 bg-gray-100">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out rounded-r-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="p-6 sm:p-8 lg:p-10">
        {/* Step indicator */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className={cn(
              "flex items-center gap-1.5 text-sm font-medium transition-colors",
              currentStep === 0 && !isComplete
                ? "text-gray-300 cursor-default"
                : "text-slate-body hover:text-primary"
            )}
            disabled={currentStep === 0 && !isComplete}
          >
            <ArrowLeft size={16} />
            Zurück
          </button>

          <div className="flex items-center gap-2">
            {ratgeberQuestions.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  i < currentStep || isComplete
                    ? "bg-primary"
                    : i === currentStep && !isComplete
                    ? "bg-primary scale-125"
                    : "bg-gray-200"
                )}
              />
            ))}
          </div>

          <span className="text-sm text-slate-body">
            {isComplete ? "Ergebnis" : `${currentStep + 1} / ${totalSteps}`}
          </span>
        </div>

        {!isComplete ? (
          /* Question View */
          <div key={currentQuestion.id} className="animate-fadeIn">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-dark mb-2">
              {currentQuestion.question}
            </h3>
            {currentQuestion.subtitle && (
              <p className="text-slate-body mb-8">
                {currentQuestion.subtitle}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentQuestion.options.map((option) => {
                const Icon = iconMap[option.icon] || Home;
                const isSelected =
                  answers[currentQuestion.id] === option.id;

                return (
                  <button
                    key={option.id}
                    onClick={() =>
                      handleSelect(currentQuestion.id, option.id)
                    }
                    className={cn(
                      "flex items-start gap-4 p-5 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-md group",
                      isSelected
                        ? "border-primary bg-primary-50 shadow-md"
                        : "border-gray-200 hover:border-primary/50 bg-white"
                    )}
                  >
                    <div
                      className={cn(
                        "w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors",
                        isSelected
                          ? "bg-primary text-white"
                          : "bg-primary-50 text-primary group-hover:bg-primary-100"
                      )}
                    >
                      <Icon size={22} />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-dark mb-0.5">
                        {option.label}
                      </div>
                      {option.description && (
                        <div className="text-sm text-slate-body">
                          {option.description}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Result View */
          <div className="animate-fadeIn text-center max-w-lg mx-auto">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} className="text-green-600" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-dark mb-3">
              {result.title}
            </h3>
            <p className="text-slate-body mb-8 leading-relaxed">
              {result.text}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button href="/kontakt" variant="primary" size="lg">
                Kostenlos beraten lassen
                <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button
                href={`tel:${siteConfig.contact.phoneRaw}`}
                variant="secondary"
                size="lg"
              >
                <Phone size={18} className="mr-2" />
                Jetzt anrufen
              </Button>
            </div>

            <button
              onClick={handleRestart}
              className="mt-6 text-sm text-slate-body hover:text-primary transition-colors underline underline-offset-2"
            >
              Ratgeber neu starten
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
