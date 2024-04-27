interface FormValues {
  userId: string;
  cover?: string | null;
  coverId?: string | null;
  vehicle: 'CAR' | 'MOTORCYCLE';
  vehicleName: string;
  maxKm: number;
  lastKm: number;
  oilCount: number;
  oilType: string;
  lastTime: Date;
}
