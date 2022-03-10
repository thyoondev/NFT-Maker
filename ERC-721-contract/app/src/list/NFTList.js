import { useParams, useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import Metadata from './Metadata';
import { Button, ButtonGroup, Card, CardActions, ImageList, ImageListItem } from '@mui/material';
import { Fragment, useContext, useEffect, useState } from 'react';
import { Context } from '../App';
import { getTokenURI, saveMintedItems } from '../utils';
import { ethers } from 'ethers';
import artifact from '../contracts/CYBERVATnft.json';

const ITEMS_PER_PAGE = 9;
const TOTAL_COUNT = 20;
const FIRST_PAGE = 1;
const LAST_PAGE = Math.ceil(TOTAL_COUNT / ITEMS_PER_PAGE);
const START_INDEX_ON_LAST_PAGE = TOTAL_COUNT - (TOTAL_COUNT % ITEMS_PER_PAGE);

function NFTList() {
  let startIndex = 0;
  let list = [];
  const params = useParams();
  const navigate = useNavigate();
  const OWNER = '0x5A2609D698DE041B1Ba77139A4229c8a161dDd9e';

  const CYBERCATNft = useContext(Context).CYBERCATNft;
  const defaultProvider = useContext(Context).defaultProvider;

  const [minted, setMinted] = useState('');

  const next = localStorage.getItem('CYBERCAT.next');
  localStorage.setItem('CYBERCAT.next', startIndex + ITEMS_PER_PAGE);

  for (let i = 0; i < ITEMS_PER_PAGE; i++) {
    list.push(i);
  }

  if (!isEmpty(params)) {
    startIndex = ITEMS_PER_PAGE * (params.pageNo - 1);

    if (startIndex === START_INDEX_ON_LAST_PAGE) {
      list.splice(0);
      for (let i = 0; i < TOTAL_COUNT % ITEMS_PER_PAGE; i++) {
        list.push(i);
      }
    }
  }

  const handleNext = () => {
    const v = parseInt(next / ITEMS_PER_PAGE) + 1;
    if (v <= LAST_PAGE) {
      navigate(`/${v}`);
    }
  };

  const handlePrev = () => {
    const v = parseInt(next / ITEMS_PER_PAGE) - 1;
    if (v >= FIRST_PAGE) {
      navigate(`/${v}`);
    }
  };

  const handleMint = async (e) => {
    if (CYBERCATNft !== null) {
      const tokenId = e.target.getAttribute('tokenid');
      const tokenURI = await getTokenURI(tokenId);

      const tx = await CYBERCATNft.mint(OWNER, tokenId, tokenURI, { gasLimit: 3000000 });
      try {
        await tx.wait();
      } catch (error) {
        console.log(error.reason);
      }
    } else {
      console.log('WALLET DISCONNECTED');
    }
  };

  useEffect(() => {
    if (CYBERCATNft !== null) {
      const alsNftInterface = new ethers.utils.Interface(artifact.contracts.ALSnft.abi);
      defaultProvider.on({ address: CYBERCATNft.address }, (logs) => {
        const result = alsNftInterface.parseLog(logs);
        saveMintedItems(result.args.tokenId.toString());
        setMinted(result.args.tokenId.toString());
      });
    } else {
      console.log('NULL');
    }
  }, [CYBERCATNft]);

  const item = (i) => (
    <ImageListItem key={i}>
      <Card sx={{ maxWidth: '180px' }}>
        <Metadata id={i + 1} />
        <CardActions>
          <Button color='primary' variant='contained' onClick={handleMint} tokenid={i + 1}>
            mint
          </Button>
          <Button color='primary' variant='contained'>
            sale
          </Button>
        </CardActions>
      </Card>
    </ImageListItem>
  );

  return (
    <Fragment>
      <ImageList sx={{ width: '800px' }} cols={3}>
        {list.map((v) => item(startIndex + v))}
      </ImageList>
      <ButtonGroup>
        <Button color='primary' onClick={handlePrev}>
          이전
        </Button>
        <Button color='secondary' onClick={handleNext}>
          다음
        </Button>
      </ButtonGroup>
    </Fragment>
  );
}
export default NFTList;
