import React, { useEffect, useState } from "react";
import { db } from "../backend/firebase";
import { Button, Card, Grid, Container, Image } from "semantic-ui-react";
import { useNavigate, useParams } from "react-router-dom";
import {
	collection,
	doc,
	deleteDoc,
	onSnapshot,
	// serverTimestamp,
} from "firebase/firestore";

import ModalComp from "../components/ModalComp";

const VotingPage = () => {
	const [candidateprofile, setCandidateProfile] = useState([]);
	const [open, setOpen] = useState(false);
	const [candidate, setCandidate] = useState({});
	const [loading, setLoading] = useState(false);
	// const [vote, setVote] = useState(0);

	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);
		const unsub = onSnapshot(
			collection(db, "candidateprofile"),
			(snapshot) => {
				let list = [];
				snapshot.docs.forEach((doc) => {
					list.push({ id: doc.id, ...doc.data() });
				});
				setCandidateProfile(list);
				setLoading(false);
			},
			(error) => {
				console.log(error);
			}
		);
		return () => {
			unsub();
		};
	}, []);

	const handleModal = (item) => {
		setOpen(true);
		setCandidate(item);
	};
	const handleDelete = async (id) => {
		if (window.confirm("Are you sure to delete this user ?")) {
			try {
				setOpen(false);
				await deleteDoc(doc(db, "candidateprofile", id));
				setCandidateProfile(
					candidateprofile.filter((candidate) => candidate.id !== id)
				);
			} catch (err) {
				console.log(err);
			}
		}
	};

	const VoteButtons = async (pot) => {
		console.log(candidate.name);
		// Do calculation to save the vote.
		//   const post =
		//   await db.collection("candidateprofile").doc().set({
		// 	name: candidate.name,
		// 	vote: vote,
		// 	createdAt: serverTimestamp,

		//   });
	};

	return (
		<Container>
			<Grid columns={3} className=" my-5" stackable>
				{candidateprofile &&
					candidateprofile.map((item) => (
						<Grid.Column key={item.id}>
							<Card key={item.id}>
								<Card.Content>
									<Image
										src={item.img}
										size="large"
										style={{
											height: "150px",
											width: "100rem",
											borderRadius: "50%",
										}}
									/>
									<Card.Header style={{ marginTop: "10px" }}>
										{item.name}
									</Card.Header>
									<Card.Description> {item.info}</Card.Description>
								</Card.Content>
								<Card.Content extra>
									<div>
										<Button
											color="green"
											onClick={() => navigate(`/update/${item.id}`)}
										>
											Update
										</Button>
										<Button color="purple" onClick={() => handleModal(item)}>
											View
										</Button>
										{open && (
											<ModalComp
												open={open}
												setOpen={setOpen}
												handleDelete={handleDelete}
												{...candidate}
											/>
										)}
										<div className="content">
											<button
												onClick={() => VoteButtons()}
												color="red"
												className="upvote"
											>
												Vote
											</button>

											<span className="vote"></span>
										</div>
									</div>
								</Card.Content>
							</Card>
						</Grid.Column>
					))}
			</Grid>
		</Container>
	);
};

export default VotingPage;
