import React from "react";

//create your first component
export class Home extends React.Component {
	constructor(props) {
		super(props);
		this.player = null;
		this.state = {
			songs: [
				{
					title: "Blame Canada",
					id: "south-park",
					author: "Kyle",
					url:
						"https://assets.breatheco.de/apis/sound/files/cartoons/songs/south-park.mp3"
				},
				{
					title: "Thunder Cats Theme",
					id: "thundercats",
					author: "Moonra",
					url:
						"https://assets.breatheco.de/apis/sound/files/cartoons/songs/thundercats.mp3"
				},
				{
					title: "X-Men Theme",
					id: "x-men",
					author: "Profesor X",
					url:
						"https://assets.breatheco.de/apis/sound/files/cartoons/songs/x-men.mp3"
				}
			],
			currentSong: {},

			currentButton: "",
			j: 0,
			shuffle: "",
			looping: false,
			volume: 50
		};
	}

	playSong = index => {
		if (this.state.shuffle !== true) {
			if (index >= this.state.songs.length) {
				index = 0;
			} else if (index < 0) {
				index = 0;
			}
		} else {
			index = Math.floor(Math.random() * this.state.songs.length);
		}

		this.setState({ currentSong: this.state.songs[index], j: index });

		this.player.play();
		this.playButton.style.display = "none";
		this.pauseButton.style.display = "inline";
	};

	pauseSong = index => {
		this.player.pause();
		this.pauseButton.style.display = "none";
		this.playButton.style.display = "inline";
	};

	random = () => {
		this.setState({ shuffle: true });
		this.shuffle.style.display = "none";
		this.shuffleOff.style.display = "inline";
	};
	randomOff = () => {
		this.setState({ shuffle: false });
		this.shuffle.style.display = "inline";
		this.shuffleOff.style.display = "none";
	};

	looper = bool => {
		bool = !this.state.looping;
		//this.player.current.loop = bool;
		this.setState({ looping: bool });
		this.state.looping
			? (this.loop.style.opacity = 0.5)
			: (this.loop.style.opacity = 1);

		//opacity based on click is working. can't get the player.loop attribute to work
	};

	setVolume = vol => {
		if (vol > 100) {
			vol = 100;
		} else if (vol < 0) {
			vol = 0;
		}

		this.setState({
			volume: vol
		});
		//this.player.current.volume = vol;
	};

	volBar = vol => {
		this.volBar.style.width = vol * 2 + "px";
		//this.player.current.volume = vol;
	};

	componentDidMount() {}

	render() {
		return (
			<div>
				<ol>
					{this.state.songs.map((song, i) => {
						return (
							<li onClick={() => this.playSong(i)} key={i}>
								{song.title} - {song.author}
							</li>
						);
					})}
				</ol>

				<div>
					<a onClick={() => this.playSong(this.state.j - 1)}>
						<i className="fas fa-caret-square-left" />
					</a>
					<a
						ref={el => (this.playButton = el)}
						onClick={() => this.playSong(this.state.j)}>
						<i className="fas fa-play" />
					</a>

					<a
						style={{ display: "none" }}
						ref={el => (this.pauseButton = el)}
						onClick={() => this.pauseSong()}>
						<i className="fas fa-pause-circle" />
					</a>
					<a onClick={() => this.playSong(this.state.j + 1)}>
						<i className="fas fa-caret-square-right" />
					</a>
					<a
						ref={el => (this.shuffleOff = el)}
						onClick={() => this.randomOff()}>
						<i className="fas fa-random" />
					</a>
					<a
						ref={el => (this.shuffle = el)}
						onClick={() => this.random()}>
						<i className="fas fa-sort-alpha-down" />
					</a>
					<a
						ref={el => (this.loop = el)}
						onClick={() => this.looper(this.state.looping)}>
						<i className="fas fa-undo" />
					</a>

					<a
						ref={el => (this.minus = el)}
						onClick={() => this.setVolume(this.state.volume - 1)}>
						<i className="fas fa-minus" />
					</a>
					<a
						ref={el => (this.number = el)}
						onChange={() => this.volBar(this.state.volume)}>
						{this.state.volume}
					</a>
					<a
						ref={el => (this.plus = el)}
						onClick={() => this.setVolume(this.state.volume + 1)}>
						<i className="fas fa-plus" />
					</a>
				</div>
				<audio
					volume={this.state.volume}
					loop={this.state.looping}
					src={this.state.currentSong.url}
					ref={el => (this.player = el)}
				/>

				<div>{this.state.currentSong.title}</div>
				<div>{this.state.currentSong.author}</div>
			</div>
		);
	}
}
