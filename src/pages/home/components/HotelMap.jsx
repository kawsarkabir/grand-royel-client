export function HotelMap() {
  return (
    <section className="py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6 text-center mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
          Find Us Here
        </h2>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed mb-12">
          Our prime location offers easy access to local attractions and
          stunning views.
        </p>
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden shadow-lg">
          {/* Using a placeholder iframe for Google Maps. In a real app, you'd use a specific embed URL. */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.2999999999996!2d144.9631!3d-37.814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b9c216821f%3A0x5045675218ce7e0!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1678888888888!5m2!1sen!2sau"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Hotel Location Map"
            aria-label="Hotel Location Map"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
