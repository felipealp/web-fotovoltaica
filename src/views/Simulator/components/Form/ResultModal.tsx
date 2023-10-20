/* eslint-disable react/prop-types */
import React from 'react';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PowerIcon from '@material-ui/icons/Power';
import SquareFootIcon from '@material-ui/icons/SquareFoot';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import UpdateIcon from '@material-ui/icons/Update';
import PointOfSale from '@material-ui/icons/PointOfSale';

interface ResultModalProps {
  data: any;
  onClose: () => void;
}
function calcularValoresSimulacao (electricityAccess: any, locationType: any, monthlyEnergyCost: any) {
  // Defina os fatores de custo com base nos valores fornecidos
  const fatorCustoBase = electricityAccess ? 0.8 : 1.2; // Se electricityAccess for true, custo menor; caso contrário, custo maior.
  let fatorTipoLocal = 1.0; // Valor padrão para local desconhecido (outro).
  
  if (locationType === 'residencial') {
    fatorTipoLocal = 0.8; // Residencial é mais barato.
  } else if (locationType === 'empresarial') {
    fatorTipoLocal = 1.1; // Empresarial é mais caro.
  }

  // Cálculo do investimento (Range)
  const investimentoMinimo = fatorCustoBase * fatorTipoLocal * monthlyEnergyCost * 12 * 5; // 5 anos
  const investimentoMaximo = fatorCustoBase * fatorTipoLocal * monthlyEnergyCost * 12 * 7; // 7 anos

  // Cálculo da economia mensal
  const economiaMensal = fatorCustoBase * fatorTipoLocal * monthlyEnergyCost * 0.15; // 15% do custo mensal

  // Cálculo da economia total acumulada em 30 anos
  const economiaTotal30Anos = economiaMensal * 12 * 30;

  // Cálculo de potência instalada (exemplo: 2.5 kW)
  const potenciaInstalada = monthlyEnergyCost / 100; // Pode ajustar o fator conforme necessário

  // Cálculo da área mínima necessária (exemplo: 20 m²)
  const areaMinimaNecessaria = potenciaInstalada * 8; // Pode ajustar o fator conforme necessário

  // Cálculo de produção mensal de kWh/mês (exemplo: 300 kWh/mês)
  const producaoMensal = potenciaInstalada * 120; // Pode ajustar o fator conforme necessário

  // Cálculo do tempo aproximado em anos para retorno do investimento
  const tempoRetornoInvestimento = investimentoMinimo / (economiaMensal * 12); // Anos para o investimento se pagar

  return {
    investmentRange: [investimentoMinimo, investimentoMaximo],
    monthlySavings: economiaMensal,
    totalSavings: economiaTotal30Anos,
    installedPower: potenciaInstalada,
    requiredArea: areaMinimaNecessaria,
    monthlyProduction: producaoMensal,
    paybackTime: tempoRetornoInvestimento,
  };
}

// eslint-disable-next-line react/prop-types
const ResultModal: React.FC<ResultModalProps> = ({ data, onClose }) => {

  console.log('resultados', data);



  const simuladtion = calcularValoresSimulacao(data.electricityAccess, data.locationType, data.monthlyEnergyCost);
  return (
    <Modal
      open={true} // Defina o estado do modal aqui
      onClose={onClose}
      aria-labelledby="result-modal-title"
      aria-describedby="result-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1000,
          bgcolor: 'background.paper',
          border: '0px solid #000',
          borderRadius: '5px',
          boxShadow: 12,
          p: 2,
        }}
      >
        <h2 style={{textAlign:'center', color:'#00AB55'}}>Resultados</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr', // Divide em duas colunas de largura igual
          gap: '20px', // Espaço entre as colunas
        }}>
          <div style={{margin: '2rem'}}>
            <Typography variant="h6" id="result-modal-title" style={{display: 'flex', alignItems: 'center'}}>
              <AttachMoneyIcon style={{ marginRight: '5px' }} /> Investimento
            </Typography>
            <Typography variant="body1" style={{ marginTop: '10px', marginBottom: '10px', color:'#00AB55' }}>
              De R$ {simuladtion.investmentRange[0].toFixed(2)} a R$ {simuladtion.investmentRange[1].toFixed(2)}
            </Typography>

            <Typography variant="h6" id="result-modal-title"  style={{display: 'flex', alignItems: 'center'}}>
              <PointOfSale style={{ marginRight: '5px' }} /> Economia total acumulada em 30 anos
            </Typography>
            <Typography variant="body1" style={{ marginTop: '10px', marginBottom: '10px', color:'#00AB55' }}>
              R$ {simuladtion.totalSavings.toFixed(2)}
            </Typography>

            <Typography variant="h6" id="result-modal-title"  style={{display: 'flex', alignItems: 'center'}}>
              <MonetizationOnIcon style={{ marginRight: '5px' }} /> Economia mensal
            </Typography>
            <Typography variant="body1" style={{ marginTop: '10px', marginBottom: '10px', color:'#00AB55' }}>
              R$ {simuladtion.monthlySavings.toFixed(2)}
            </Typography>

            <Typography variant="h6" id="result-modal-title"  style={{display: 'flex', alignItems: 'center'}}>
              <PowerIcon style={{ marginRight: '5px' }} /> Potência Instalada
            </Typography>
            <Typography variant="body1" style={{ marginTop: '10px', marginBottom: '10px', color:'#00AB55' }}>
              {simuladtion.installedPower.toFixed(2)} kW
            </Typography>
          </div>

          

          <div style={{margin: '2rem'}}>
            <Typography variant="h6" id="result-modal-title"   style={{display: 'flex', alignItems: 'center'}}>
              <SquareFootIcon style={{ marginRight: '5px' }} /> Área Mínima Necessária
            </Typography>
            <Typography variant="body1" style={{ marginTop: '10px', marginBottom: '10px', color:'#00AB55' }}>
              {simuladtion.requiredArea.toFixed(2)} m²
            </Typography>

            <Typography variant="h6" id="result-modal-title"   style={{display: 'flex', alignItems: 'center'}}>
              <FlashOnIcon style={{ marginRight: '5px' }} /> Produção Mensal de kWh/mês
            </Typography>
            <Typography variant="body1" style={{ marginTop: '10px', marginBottom: '10px', color:'#00AB55' }}>
              {simuladtion.monthlyProduction.toFixed(2)} kWh/mês
            </Typography>

            <Typography variant="h6" id="result-modal-title"   style={{display: 'flex', alignItems: 'center'}}>
              <UpdateIcon style={{ marginRight: '5px' }} /> Tempo para Retorno de Investimento
            </Typography>
            <Typography variant="body1" style={{ marginTop: '10px', marginBottom: '10px', color:'#00AB55' }}>
              {simuladtion.paybackTime.toFixed(2)} anos
            </Typography>
          </div>
      
        </div>

        
        <Button style={{width: '100%'}} onClick={onClose}>Fechar</Button>
      </Box>
    </Modal>
  );
};

export default ResultModal;
