export const mockData = {
  Crack: {
    // Mock data for GET requests
    getResponses: {
      // When keyword is provided
      withParams: [
        {
          id: 1,
          name: "Crack Pattern A",
          severity: "High",
          location: "Wall Section 1",
          dimensions: "2.5m x 0.3m",
          detectedAt: "2024-03-15T10:30:00Z"
        },
        {
          id: 2,
          name: "Crack Pattern B",
          severity: "Medium",
          location: "Floor Section 3",
          dimensions: "1.2m x 0.1m",
          detectedAt: "2024-03-14T15:45:00Z"
        }
      ],
      // Default response for GET all
      all: [
        {
          id: 1,
          name: "Crack Pattern A",
          severity: "High",
          location: "Wall Section 1",
          dimensions: "2.5m x 0.3m",
          detectedAt: "2024-03-15T10:30:00Z"
        },
        {
          id: 2,
          name: "Crack Pattern B",
          severity: "Medium",
          location: "Floor Section 3",
          dimensions: "1.2m x 0.1m",
          detectedAt: "2024-03-14T15:45:00Z"
        },
        {
          id: 3,
          name: "Crack Pattern C",
          severity: "Low",
          location: "Ceiling Section 2",
          dimensions: "0.8m x 0.05m",
          detectedAt: "2024-03-13T09:15:00Z"
        },
        {
          id: 4,
          name: "Crack Pattern D",
          severity: "Critical",
          location: "Foundation Area 1",
          dimensions: "3.0m x 0.4m",
          detectedAt: "2024-03-12T14:20:00Z"
        }
      ]
    },
    // Mock data for PATCH/DELETE requests
    updateResponse: {
      success: true,
      message: "Operation completed successfully",
      timestamp: "2024-03-15T12:00:00Z"
    }
  },
  Home: {
    stats: {
      totalCracks: 15,
      criticalIssues: 3,
      lastScan: "2024-03-15T08:00:00Z",
      systemStatus: "Operational"
    }
  }
} 