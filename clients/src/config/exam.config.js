// ================================
// EXAMS CONFIG – SINGLE SOURCE
// ================================

export const EXAMS_CONFIG = {
    GATE: {
      label: "GATE",
      inputType: "score",
      endpoint: "/api/gate/predict",
      requires: { gatePaper: true },
  
      buildPayload: ({ gateScore, gatePaper, category, domicile }) => ({
        gateScore: Number(gateScore),
        academicProgram: gatePaper,
        category,
        gender: "Gender-Neutral",
        domicile
      }),
  
      normalizeResult: (row) => ({
        opening: row.minGateScore,
        closing: row.maxGateScore
      }),
  
      chanceLogic: ({ gateScore, minGateScore }) => {
        if (gateScore >= minGateScore + 30) return "Safe";
        if (gateScore >= minGateScore) return "Moderate";
        return "Dream";
      }
    },
  
    WBJEE: {
        label: "WBJEE",
        inputType: "rank",
        endpoint: "/api/wbjee/predict",
      
        buildPayload: ({ rank, category, domicile }) => ({
            rank: Number(rank),
            exam: "WBJEE",
            category: category === "GEN" ? "Open" : category,
            domicile
          }),
      
        normalizeResult: (row) => ({
          opening: row.openingRank,
          closing: row.closingRank
        }),
      
        chanceLogic: ({ rank, closingRank }) => {
          if (rank <= closingRank * 0.7) return "Safe";
          if (rank <= closingRank) return "Moderate";
          return "Dream";
        }
      },
      
  
    JEE_MAIN: {
      label: "JEE Main",
      inputType: "rank",
      endpoint: "INTERNAL",
  
      buildPayload: ({ rank, category, domicile, rounds }) => ({
        rank,
        exam: "JEE_MAIN",
        category,
        domicile,
        rounds
      }),
  
      normalizeResult: (row) => ({
        opening: row.openingRank,
        closing: row.closingRank
      }),
  
      chanceLogic: ({ rank, closingRank }) => {
        if (rank <= closingRank * 0.7) return "Safe";
        if (rank <= closingRank) return "Moderate";
        return "Dream";
      }
    },
  
    JEE_ADV: {
      label: "JEE Advanced",
      inputType: "rank",
      endpoint: "INTERNAL",
  
      buildPayload: ({ rank, category, domicile, rounds }) => ({
        rank,
        exam: "JEE_ADV",
        category,
        domicile,
        rounds
      }),
  
      normalizeResult: (row) => ({
        opening: row.openingRank,
        closing: row.closingRank
      }),
  
      chanceLogic: ({ rank, closingRank }) => {
        if (rank <= closingRank * 0.7) return "Safe";
        if (rank <= closingRank) return "Moderate";
        return "Dream";
      }
    }
  };
  