export interface RegistrationFormData {
    diagnosticProvider: {
      name: string
      email: string
      phone: string
      address: string
      latitude: string
      longitude: string
      city: string
      state: string
      rcNumber: string
      // rrbnLicenseNumber: string
      // mlscnLicenseNumber: string
      // bankAccountNumber: string
      // bankName: string
      // paymentMethod: string
    }
    manager: {
      email: string
      password: string
      firstName: string
      lastName: string
      phone: string
      // avatarURL: string
    }
    // staffInfo: {
    //   identificationType: string
    //   identificationNumber: string
    // }
  }
  