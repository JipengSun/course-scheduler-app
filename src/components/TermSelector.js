import {Button} from 'rbx'

const terms = {F:'Fall',W:'Winter',S:'Spring'};

const buttonColor = selected=>(
    selected ? 'success' : null
  );


const TermSelector = ({state})=>(
    <Button.Group hasAddons>
      {
        Object.values(terms).map( value => 
        <Button 
          key = {value}
          color = {buttonColor(value === state.term)}
          onClick = { () => state.setTerm(value)}
        > {value} </Button>
        )
      }
    </Button.Group>
  );

export default TermSelector