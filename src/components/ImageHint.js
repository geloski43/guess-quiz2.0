import React from 'react';
import styled from '@emotion/styled';
import BackgroundImageOnLoad from 'background-image-on-load';

const ImageHint = ({ imageHint, bgIsLoaded, setBgIsLoaded, clearedIndex }) => {
  const ImageDivContainer = styled.div`
    display: table;
    width: 200px;
    border-collapse: collapse;
    box-sizing: border-box;
    background: url(${bgIsLoaded && imageHint
        ? imageHint
        : 'https://via.placeholder.com/200x250/bbc2cc/bbc2cc/...'})
      no-repeat center center;
    -webkit-background-size: 200px;
    -moz-background-size: 200px;
    -o-background-size: 200px;
    background-size: 200px;
  `;

  const ImageDivBlocks = styled.div`
    display: table-row;
  `;

  const ImageDivBlock = styled.div`
    display: table-cell;
    height: 50px;
    border: 2px solid #fff;
  `;

  const ImageDivBlockBlurred = styled.div`
    display: table-cell;
    border: 2px solid #fff;
    height: 50px;
    background: url('https://via.placeholder.com/200x150/bbc2cc/bbc2cc/...')
      no-repeat center center;
    filter: blur(2px);
    -webkit-filter: blur(2px);
  `;

  const columns = Array.from(Array(4).keys());
  const rows = Array.from(Array(5).keys());

  return (
    <ImageDivContainer>
      {rows.map((v, i) => (
        <ImageDivBlocks key={i}>
          {columns.map((val, indx) =>
            indx === 0 ||
            indx === 3 ||
            clearedIndex.includes(i) ||
            imageHint ===
              'https://via.placeholder.com/200x150/bbc2cc/FF0000/?text=No_Image' ? (
              <ImageDivBlock key={indx}></ImageDivBlock>
            ) : (
              <ImageDivBlockBlurred key={indx}></ImageDivBlockBlurred>
            )
          )}
        </ImageDivBlocks>
      ))}
      <BackgroundImageOnLoad
        src={'https://unsplash.it/1200/310?random'}
        onLoadBg={() => {
          setTimeout(() => {
            setBgIsLoaded(true);
          }, 2000);
        }}
        onError={err => console.log('error', err)}
      />
    </ImageDivContainer>
  );
};

export default ImageHint;
