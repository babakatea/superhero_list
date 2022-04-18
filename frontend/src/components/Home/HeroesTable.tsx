import React, {useState} from "react";
import {
    Button,
    Dialog, DialogTitle,
    Input,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {HeroesData} from "../../interfaces";
import '../styles.css';
import {useNavigate} from "react-router-dom";

interface Props {
    data: HeroesData[];
    removeHero: (id: number) => void;
    addHero: (data: HeroesData) => void;
}

const HeroesTable: React.FC<Props> = ({data, removeHero, addHero}) => {
    const [heroesData, setHeroesData] = useState<HeroesData | null>({
        id: 0,
        name: '',
        shortDescription: '',
        description: '',
        power: ''
    });
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const disableButton = !heroesData.name || !heroesData.shortDescription || !heroesData.description || !heroesData.power;

    // Create random int for new hero`s id that should come from POST request
    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setHeroesData({id: 0, name: '', description: '', shortDescription: '', power: ''});
    };

    const HeroDialog = (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Add new Superhero</DialogTitle>
            <Input
                placeholder={'Hero`s name'}
                value={heroesData?.name}
                onChange={(e) => setHeroesData({...heroesData, id: getRandomInt(100),name: e.target.value})}
            />
            <Input
                placeholder={'Hero`s short description'}
                value={heroesData?.shortDescription}
                onChange={(e) => setHeroesData({...heroesData, shortDescription: e.target.value})}

            />
            <Input
                placeholder={'Hero`s description'}
                value={heroesData?.description}
                onChange={(e) => setHeroesData({...heroesData, description: e.target.value})}

            />
            <Input
                placeholder={'Hero`s power'}
                value={heroesData?.power}
                onChange={(e) => setHeroesData({...heroesData, power: e.target.value})}

            />
            <Button
                size={'small'}
                variant="contained"
                className={'create-hero'}
                onClick={() => {
                    addHero(heroesData);
                    handleClose();
                }}
                disabled={disableButton}
            >
                Create
            </Button>
        </Dialog>
    );

    return(
        <div className={'table-container'}>
            <p className={'table-title'}>Superheroes table</p>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="superheroes table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Power</TableCell>
                            <TableCell>Short description</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow
                                key={item.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row"
                                           onClick={() => {
                                               navigate(`/hero/${item.id}`, {replace: true})
                                           }}>
                                    <span className={'hero-name'}>{item.name}</span>
                                </TableCell>
                                <TableCell>{item.power}</TableCell>
                                <TableCell>{item.shortDescription}</TableCell>
                                <TableCell align={'center'}>
                                    <DeleteIcon onClick={() => removeHero(item.id)} color={'error'}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button className={'add-hero'} size={'small'} variant="contained" onClick={handleOpen}>
                Add new hero
            </Button>
            {HeroDialog}
        </div>
    )
}

export {HeroesTable};