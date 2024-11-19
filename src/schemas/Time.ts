import { z } from 'zod';
import { JogadorSchema } from './Jogador';

export const TitulosSchema = z.object({
    nacionais: z.string().optional(),
    regionais: z.string().optional(),
    estaduais: z.string().optional(),
  });
  
  export const TimeSchema = z.object({
    id: z.number().optional(),
    nome: z.string(),
    sigla: z.string(),
    cor: z.string(),
    cidade: z.string(),
    fundacao: z.string(), // Manter como string, pois tem formato específico de data
    logo: z.string(),
    capacete: z.string(),
    instagram: z.string(),
    instagram2: z.string(),
    estadio: z.string(),
    presidente: z.string(),
    head_coach: z.string(),
    coord_ofen: z.string(),
    coord_defen: z.string(),
    titulos: z.array(TitulosSchema).optional(),
    jogadores: z.array(JogadorSchema).optional(),
  });
  