import { Container } from '@/components/shared/container';
import { OffersTabs } from '@/components/shared/offers-tabs';

export default function OffersPage() {
  return (
    <div className="mb-[100px] mt-[30px]">
      <Container>
        <h2 className="text-black text-[20px] mb-3 mt-3">Teklifler</h2>
        <OffersTabs />
      </Container>
    </div>
  );
}
