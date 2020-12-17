import React from "react";

//create your first component
export class Home extends React.Component {
	constructor(props) {
		super(props);
		this.player = null;
		this.state = {
			songs: [
				{
					title: "South Park",
					id: "south-park",
					author: "Kyle",
					url:
						"https://assets.breatheco.de/apis/sound/files/cartoons/songs/south-park.mp3"
				},
				{
					title: "Thunder Cats",
					id: "thundercats",
					author: "Moonra",
					url:
						"https://assets.breatheco.de/apis/sound/files/cartoons/songs/thundercats.mp3"
				},
				{
					title: "X-Men",
					id: "x-men",
					author: "Profesor",
					url:
						"https://assets.breatheco.de/apis/sound/files/cartoons/songs/x-men.mp3"
				}
			],
			currentSong: {},
			currentAction: <i className="fas fa-play" />,
			currentButton: "",

			j: 0
		};
	}

	playSong = index => {
		if (this.state.currentbutton !== "play") {
			this.setState({
				currentSong: this.state.songs[index],
				currentAction: <i className="fas fa-play" />,
				currentButton: "play"
			});
			this.player.play();
		} else {
			this.setState({
				currentAction: <i className="fas fa-pause-circle" />,
				currentButton: "pause"
			});

			this.player.pause();
		}
	};

	nextTrack = index => {
		if (index >= this.state.songs.length) {
			index = 0;
		} else if (index < 0) {
			index = 0;
		}
		this.setState({
			j: index
		});
		this.playSong(index);
	};

	render() {
		//this.player.onended(this.nextTrack(this.state.j + 1));
		return (
			<div>
				<ol>
					{this.state.songs.map((song, i) => {
						return <li key={i}>{song.title}</li>;
					})}
				</ol>
				<div>
					<a onClick={() => this.nextTrack(this.state.j - 1)}>
						<i className="fas fa-caret-square-left" />
					</a>
					<a onClick={() => this.playSong(this.state.j)}>
						{this.state.currentAction}
					</a>
					<a onClick={() => this.nextTrack(this.state.j + 1)}>
						<i className="fas fa-caret-square-right" />
					</a>
				</div>
				<audio
					src={this.state.currentSong.url}
					ref={el => (this.player = el)}
				/>
			</div>
		);
	}
}
