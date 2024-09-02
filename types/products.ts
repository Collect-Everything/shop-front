export const PRODUCT_CONDITIONING = [
  'unit',
  '1_kg',
  '500_g',
  '1_L',
  '100_g',
] as const
export type ProductConditioning = (typeof PRODUCT_CONDITIONING)[number]

export const PRODUCT_CONDITIONING_LABELS = {
  unit: '1 pièce',
  '1_kg': '1 kg',
  '500_g': '500 g',
  '1_L': '1 L',
  '100_g': '100 g',
} as const
