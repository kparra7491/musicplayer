import React from "react";

//create your first component
export class Home extends React.Component {
	constructor(props) {
		super(props);
		this.player = null;
		this.state = {
			songs: [],
			currentSong: {},
			playLists: [],
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

		let newvol = vol / 100;
		this.setState({
			volume: vol
		});
		this.player.volume = newvol;
	};

	volBar = vol => {
		this.volBar.style.width = vol * 2 + "px";
		//this.player.current.volume = vol;
	};

	componentDidMount() {
		this.shuffle.style.display = "none";
		fetch("https://assets.breatheco.de/apis/sound/all")
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(jsonifiedResponse => {
				let allLists = Object.values(jsonifiedResponse);
				this.setState({
					playLists: allLists,
					songs: allLists[1]
				});
			})

			.catch(function(error) {
				console.log("ya broke it", error);
			});
	}

	render() {
		return (
			<div className="container d-flex">
				<div className="player">
					<div className=" header">Playlist Title</div>
					<div
						className="row list overflow-auto scrollbar"
						id="style-4">
						<ol className="col">
							{this.state.songs.map((song, i) => {
								return (
									<li
										className={
											"row " +
											(i == this.state.j ? "hold" : "")
										}
										onClick={() => this.playSong(i)}
										key={i}>
										<div className="col-2">
											{song.category}
										</div>
										-
										<div className="col-auto">
											{song.name}
										</div>
										<div />
									</li>
								);
							})}
						</ol>
					</div>{" "}
					<div className="mediabar">
						<div className="nowplaying">
							<div className="title">
								{this.state.currentSong.name}
							</div>
							<div className="category">
								{this.state.currentSong.category}
							</div>
						</div>
						<div className="playbar ">
							<a
								ref={el => (this.shuffleOff = el)}
								onClick={() => this.randomOff()}>
								<i className="fas fa-random func " />
							</a>
							<a
								ref={el => (this.shuffle = el)}
								onClick={() => this.random()}>
								<i className="fas fa-sort-alpha-down  func" />
							</a>

							<a onClick={() => this.playSong(this.state.j - 1)}>
								<i className="fas fa-backward skips" />
							</a>
							<a
								ref={el => (this.playButton = el)}
								onClick={() => this.playSong(this.state.j)}>
								<i className="fas fa-play bigbutton" />
							</a>

							<a
								style={{ display: "none" }}
								ref={el => (this.pauseButton = el)}
								onClick={() => this.pauseSong()}>
								<i className="fas fa-pause-circle bigbutton" />
							</a>
							<a onClick={() => this.playSong(this.state.j + 1)}>
								<i className="fas fa-forward skips" />
							</a>

							<a
								ref={el => (this.loop = el)}
								onClick={() => this.looper(this.state.looping)}>
								<i className="fas fa-undo func" />
							</a>
						</div>
						<div className="volume col-auto">
							<a
								ref={el => (this.minus = el)}
								onClick={() =>
									this.setVolume(this.state.volume - 1)
								}>
								<i className="fas fa-minus" />
							</a>
							<a
								ref={el => (this.number = el)}
								onChange={() => this.volBar(this.state.volume)}>
								{this.state.volume}
							</a>
							<a
								ref={el => (this.plus = el)}
								onClick={() =>
									this.setVolume(this.state.volume + 1)
								}>
								<i className="fas fa-plus" />
							</a>
						</div>
						<audio
							autoPlay
							loop={this.state.looping}
							src={
								"https://assets.breatheco.de/apis/sound/" +
								this.state.currentSong.url
							}
							ref={el => (this.player = el)}
						/>
					</div>
				</div>
			</div>
		);
	}
}
