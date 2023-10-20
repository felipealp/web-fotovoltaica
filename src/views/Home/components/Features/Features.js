/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useTheme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TeamWorkingIllustration from '../../../../layouts/svg/illustrations/TeamWorking';

const Features = () => {
  const theme = useTheme();
  return (
    <section id="benefits">
      <Box sx={{ padding: '3rem 0 0 0'}}>
        <Box marginBottom={4}>
          <Typography
            sx={{
              textTransform: 'uppercase',
              fontWeight: 'medium',
            }}
            gutterBottom
            color={'textSecondary'}
            align={'center'}
          >
            Benefícios
          </Typography>
          <Box
            component={Typography}
            fontWeight={700}
            variant={'h3'}
            gutterBottom
            align={'center'}
          >
            A energia solar é uma
            <br />
            escolha inteligente e sustentável.
          </Box>
          <Typography
            variant={'h6'}
            component={'p'}
            color={'textSecondary'}
            align={'center'}
          >
            Oferece uma série de benefícios, incluindo a redução de custos, a proteção do meio ambiente e 
            a independência energética.
            <br />
          </Typography>
          <Box marginTop={3} display={'flex'} justifyContent={'center'}>
            <Button
              component={'a'}
              href={'/signup'}
              variant="contained"
              color="primary"
              size="large"
              endIcon={
                <svg
                  width={16}
                  height={16}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              }
            >
              Cadastre-se e Simule
            </Button>
          </Box>
        </Box>
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          marginBottom={4}
        >
          <Box height={'100%'} width={'100%'} maxWidth={600}>
            <TeamWorkingIllustration height={'100%'} width={'100%'} />
          </Box>
        </Box>
        <Box>
          <Grid container spacing={4}>
            {[
              {
                title: 'Energia Limpa e Sustentável',
                subtitle:
                  'A energia solar é uma fonte de energia renovável e inesgotável. Ela não emite poluentes atmosféricos nem gases de efeito estufa, o que a torna uma opção amigável ao meio ambiente. Contribui para a redução da pegada de carbono e combate as mudanças climáticas.',
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
                title: 'Economia de Custos a Longo Prazo',
                subtitle:
                  'Uma vez instalado, um sistema solar pode gerar eletricidade de forma gratuita por muitas décadas. Isso pode levar a uma significativa redução nas contas de eletricidade ao longo do tempo, oferecendo um retorno sólido sobre o investimento.',
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
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                ),
              },
              {
                title: 'Redução na Dependência de Combustíveis Fósseis',
                subtitle:
                  'A energia solar ajuda a diminuir a dependência de combustíveis fósseis, como o carvão e o petróleo. Isso fortalece a segurança energética e reduz a vulnerabilidade a flutuações nos preços dos combustíveis.',
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
                      d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                    />
                  </svg>
                ),
              },
              {
                title: 'Baixa Manutenção e Durabilidade',
                subtitle:
                  'Os sistemas solares requerem pouca manutenção e têm uma vida útil de 25 anos ou mais. Eles são construídos para resistir a condições climáticas adversas, tornando-os confiáveis a longo prazo.',
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
              },
              {
                title: 'Valorização do Imóvel',
                subtitle:
                  'A instalação de um sistema solar aumenta o valor de propriedades residenciais e comerciais. Compradores estão dispostos a pagar mais por imóveis com eficiência energética e sistemas solares já instalados.',
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
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                ),
              },
              {
                title: 'Acesso a Incentivos e Subsídios',
                subtitle:
                  'Muitas regiões oferecem incentivos financeiros, subsídios e créditos fiscais para encorajar a adoção de sistemas solares. Isso torna a instalação mais acessível e atrativa.',
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Box
                  component={Card}
                  padding={4}
                  borderRadius={4}
                  width={'100%'}
                  height={'100%'}
                  data-aos={'fade-up'}
                >
                  <Box display={'flex'} flexDirection={'column'}>
                    <Box
                      component={Avatar}
                      width={50}
                      height={50}
                      marginBottom={2}
                      bgcolor={theme.palette.primary.main}
                      color={theme.palette.background.paper}
                    >
                      {item.icon}
                    </Box>
                    <Box
                      component={Typography}
                      variant={'h6'}
                      gutterBottom
                      sx={{ fontWeight: 500 }}
                    >
                      {item.title}
                    </Box>
                    <Typography color="text.secondary">
                      {item.subtitle}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </section>
  );
};

export default Features;
