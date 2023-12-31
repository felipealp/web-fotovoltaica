import React from 'react';
import { alpha, useTheme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const Highlights = () => {
  const theme = useTheme();
  return (
    <Box>
      <Grid container spacing={2}>
        {[
          {
            title: 'Residências e Empresas',
            subtitle:
              'Se você está pensando em instalar painéis solares em sua casa ou empresa, um simulador de energia fotovoltaica pode ajudá-lo a entender melhor os benefícios. Ele permite estimar quanto poderia economizar em suas contas de eletricidade e o tempo necessário para recuperar seu investimento.',
            icon: (
              <svg
                height={24}
                width={24}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                />
              </svg>
            ),
          },
          {
            title: 'Empresas de Energia e Fornecedores',
            subtitle:
              'Se você trabalha em uma empresa de energia ou fornece serviços energéticos, um simulador de energia fotovoltaica pode ser uma ferramenta valiosa. Ele o auxilia na análise e projeção da geração de energia solar em uma escala regional ou de rede, apoiando a tomada de decisões estratégicas.',
            icon: (
              <svg
                height={24}
                width={24}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            ),
          },
          {
            title: 'Instaladores de Sistemas Fotovoltaicos',
            subtitle:
              'Se você é um instalador de sistemas solares, o uso de um simulador pode ser uma maneira eficaz de conquistar a confiança dos clientes. Ele permite fornecer estimativas precisas sobre os benefícios da instalação de energia solar em suas propriedades.',
            icon: (
              <svg
                height={24}
                width={24}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            ),
          },
        ].map((item, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Box width={1} height={'100%'} data-aos={'fade-up'}>
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                <Box
                  component={Avatar}
                  width={60}
                  height={60}
                  marginBottom={2}
                  bgcolor={alpha(theme.palette.primary.main, 0.1)}
                  color={theme.palette.primary.main}
                >
                  {item.icon}
                </Box>
                <Typography
                  variant={'h6'}
                  gutterBottom
                  sx={{ fontWeight: 500 }}
                  align={'center'}
                >
                  {item.title}
                </Typography>
                <Typography align={'center'} color="textSecondary">
                  {item.subtitle}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Highlights;
