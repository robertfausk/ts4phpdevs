<?php

namespace App\Twig\Components;

use App\Entity\VinylMix;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveArg;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\DefaultActionTrait;

#[AsLiveComponent('mix_voting')]
final class MixVotingComponent
{
    use DefaultActionTrait;

    #[LiveProp] // to have them automatically in all reloads
    public VinylMix $mix;

    #[LiveProp(writable: true)]
    public string $firstName = 'Karl';

    #[LiveProp]
    public bool $isVoted = false;

    #[LiveAction] // component is also a service
    public function vote(#[LiveArg] string $direction, EntityManagerInterface $em)
    {
        if ('up' === $direction) {
            $this->mix->upVote();
        } else {
            $this->mix->downVote();
        }
//        $em->persist($this->mix); // persist is only needed for new objects
        $em->flush();
        $this->isVoted = true;
    }
}
