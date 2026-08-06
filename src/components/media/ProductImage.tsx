import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';
import { Box, Skeleton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

type ProductImageProps = {
  src: string;
  alt: string;
  aspectRatio?: string;
  rounded?: boolean;
  loading?: 'lazy' | 'eager';
};

export function ProductImage({
  src,
  alt,
  aspectRatio = '4 / 5',
  rounded = false,
  loading = 'lazy',
}: ProductImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(Boolean(src));
    setHasError(!src);
  }, [src]);

  return (
    <Box
      sx={{
        position: 'relative',
        aspectRatio,
        overflow: 'hidden',
        borderRadius: rounded ? 2 : 0,
        bgcolor: 'rgba(26, 26, 28, 0.06)',
      }}
    >
      {isLoading && !hasError && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ position: 'absolute', inset: 0, zIndex: 1 }}
        />
      )}

      {hasError ? (
        <Box
          role="img"
          aria-label={`${alt} image unavailable`}
          sx={{
            height: '100%',
            display: 'grid',
            placeItems: 'center',
            color: 'text.secondary',
            textAlign: 'center',
            px: 2,
          }}
        >
          <Box>
            <ImageNotSupportedOutlinedIcon />
            <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
              Image unavailable
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box
          component="img"
          src={src}
          alt={alt}
          loading={loading}
          onLoad={() => {
            setIsLoading(false);
            setHasError(false);
          }}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          sx={{
            width: '100%',
            height: '100%',
            display: 'block',
            opacity: isLoading ? 0 : 1,
            objectFit: 'cover',
            objectPosition: 'center',
            transition: 'opacity 180ms ease, transform 220ms ease',
          }}
        />
      )}
    </Box>
  );
}
