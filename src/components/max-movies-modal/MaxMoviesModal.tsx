import { Box, Modal, Typography } from '@mui/material';

interface MaxMovieModalProps {
  visibility: boolean;
  onClose: () => void;
}

export const MaxMoviesModal = ({ ...props }: MaxMovieModalProps) => {
  const { visibility = false,  onClose } = props;

  return(
    <Modal
      open={visibility}
      onClose={onClose}
    >
      <Box sx={style}>
        <Typography style={titleTextStyle} variant="h4" component="h4">
          Limite atingido
        </Typography>
        <Typography style={descriptionTextStyle} sx={{ mt: 8 }}>
          Você atingiu o limite máximo de filmes permitidos!
          Recarregue a página para ver mais.
        </Typography>
      </Box>
    </Modal>
  )
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  width: '30rem',
  height: '13rem',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: '.5rem',
  border: '1px solid white'
};

const titleTextStyle = {
  fontFamily: 'Poppins',
  fontWeight: '500'
}

const descriptionTextStyle = {
  fontFamily: 'Poppins',
  fontSize: '16px'
}