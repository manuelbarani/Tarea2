import React from 'react';
import styles from './App.module.scss';
import Input from './components/Input/Input';
import Board from './Board/Board';
import Button from './components/Button/Button';
import produce from 'immer/dist/immer';

class App extends React.PureComponent {
	state = {
		family: {
			title: 'Familia',
			items: [ 'Manuel', 'Nathalie', 'Natalia', 'Danna' ],
			index: 0,
			input: {
				add: '',
				remove: ''
			}
		},
		drinks: {
			title: 'Bebidas',
			items: [ 'Cerveza', 'Tequila', 'Mezcal', 'Vodka' ],
			index: 0,
			input: {
				add: '',
				remove: ''
			}
		},
		friends: {
			title: 'Amigos',
			items: [ 'Ade', 'Alexis', 'Mayra' ],
			index: 0,
			input: {
				add: '',
				remove: ''
			}
		}
	};

	onHandleButton = (object) => {
		const nextState = produce(this.state, (draft) => {
			if (draft[object].items.length > draft[object].index + 1) draft[object].index = draft[object].index + 1;
			else draft[object].index = 0;
		});
		this.setState(nextState);
	};

	onAddButtonClick = (property) => {
		const nextState = produce(this.state, (draft) => {
			draft[property].items = draft[property].items.concat(draft[property].input.add);
			draft[property].input.add = '';
		});
		this.setState(nextState);
	};

	onRemoveItem = (index, property) => {
		const nextState = produce(this.state, (draft) => {
			draft[property].items.splice(index, 1);
		});
		this.setState(nextState);
	};

	onRemoveButtonClick = (property) => {
		const nextState = produce(this.state, (draft) => {
			draft[property].items.splice(draft[property].input.remove - 1, 1);
		});
		this.setState(nextState);
	};

	onAddInputChange = (event, property) => {
		const value = event.target.value;
		const nextState = produce(this.state, (draft) => {
			draft[property].input.add = value;
		});
		this.setState(nextState);
	};

	onRemoveInputChange = (event, property) => {
		const value = event.target.value;
		const nextState = produce(this.state, (draft) => {
			draft[property].input.remove = value;
		});
		this.setState(nextState);
	};

	render() {
		const { family, drinks, friends } = this.state;
		return (
			<div>
				<p className={styles.title}>¡Computo Móvil!</p>

				<div className={styles.container_boards}>
					<Board
						object={family}
						onAddButtonClick={() => this.onAddButtonClick('family')}
						onRemoveButtonClick={() => this.onRemoveButtonClick('family')}
						onAddInputChange={(event) => this.onAddInputChange(event, 'family')}
						onRemoveInputChange={(event) => this.onRemoveInputChange(event, 'family')}
						onRemoveItem={(index) => this.onRemoveItem(index, 'family')}
					/>
					<Board
						object={drinks}
						onAddButtonClick={() => this.onAddButtonClick('drinks')}
						onRemoveButtonClick={() => this.onRemoveButtonClick('drinks')}
						onAddInputChange={(event) => this.onAddInputChange(event, 'drinks')}
						onRemoveInputChange={(event) => this.onRemoveInputChange(event, 'drinks')}
						onRemoveItem={(index) => this.onRemoveItem(index, 'drinks')}
					/>
					<Board
						object={friends}
						onAddButtonClick={() => this.onAddButtonClick('friends')}
						onRemoveButtonClick={() => this.onRemoveButtonClick('friends')}
						onAddInputChange={(event) => this.onAddInputChange(event, 'friends')}
						onRemoveInputChange={(event) => this.onRemoveInputChange(event, 'friends')}
						onRemoveItem={(index) => this.onRemoveItem(index, 'friends')}
					/>
				</div>
				<div className={styles.summary}>
					<ul>
						<li>Familia: {family.items.length}</li>
						<li>Bebidas: {drinks.items.length}</li>
						<li>Amigos: {friends.items.length}</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default App;
